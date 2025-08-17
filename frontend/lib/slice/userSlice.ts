import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Listing, User } from "@/types/types";
import { fetchMessages } from "./messageSlice";

interface UserState {
  currentUser: User | null;
  accessToken: string | null;
  loading: boolean;
  favorites: Listing[];
  users: User[];
}

const initialState: UserState = {
  currentUser: null,
  accessToken: null,
  loading: false,
  favorites: [],
  users: [],
};

// Kullanıcı kayıt
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData: User, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        for (const key in errorData) {
          toast.error(errorData[key][0]);
        }
        return thunkAPI.rejectWithValue(errorData);
      }

      const data = await response.json();
      toast.success("Kayıt işlemi başarılı!");
      return data;
    } catch (error) {
      toast.error("Kullanıcı kaydı sırasında hata oluştu");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Kullanıcı login
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Giriş başarısız! Bilgilerinizi kontrol edin.");
        return thunkAPI.rejectWithValue(errorData);
      }

      const data = await response.json();
      toast.success("Giriş başarılı!");

      // Token'ları sakla
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Kullanıcıyı çek → unwrap ile veriyi al
      const user = await thunkAPI.dispatch(fetchUserAsync()).unwrap();

      if (user) {
        thunkAPI.dispatch(setLogin(user));
        thunkAPI.dispatch(fetchMessages());
        thunkAPI.dispatch(fetchUserFavoritesAsync());

        if (user.is_staff) {
          thunkAPI.dispatch(fetchAllUsersAsync());
        }
      }

      return { accessToken: data.access, refreshToken: data.refresh };
    } catch (error) {
      toast.error("Giriş sırasında hata oluştu.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);


// Favori toggle (Optimistic Update)
export const toggleFavoriteAsync = createAsyncThunk(
  "user/toggleFavorite",
  async (listingId: number, thunkAPI) => {
    const state = thunkAPI.getState() as { users: UserState };
    const token = `${state.users.accessToken}`;

    const response = await fetch(
      `http://localhost:8000/api/users/6/toggle_favorite/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ listing_id: listingId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(errorData);
    }

    return listingId; // API’den sadece ID döndür
  }
);

// Favoriler listesi çek
export const fetchUserFavoritesAsync = createAsyncThunk(
  "user/favorites",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { users: UserState };
    const token = `${state.users.accessToken}`;
    const response = await fetch(`http://localhost:8000/api/users/favorites/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      toast.error("Favoriler getirilirken hata oluştu!");
      return thunkAPI.rejectWithValue(await response.json());
    }

    return (await response.json()) as Listing[];
  }
);

// Local favori toggle helper
const toggleFavoriteLocally = (state: UserState, listingId: number) => {
  const isFav = state.favorites.some((f) => f.id === listingId);
  if (isFav) {
    state.favorites = state.favorites.filter((f) => f.id !== listingId);
  } else {
    state.favorites.push({ id: listingId } as Listing);
  }
};

// fetch all users
export const fetchAllUsersAsync = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, thunkAPI) => {
    const response = await fetch("http://localhost:8000/api/users/");
    if (!response.ok) {
      const errorData = await response.json();
      toast.error("Kullanıcılar alınırken hata oluştu!");
      return thunkAPI.rejectWithValue(errorData);
    }
    return await response.json();
  }
);

// Kullanıcı bilgilerini getir
export const fetchUserAsync = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { users: UserState };
    const token =
      state.users.accessToken || localStorage.getItem("accessToken");

    if (!token) {
      return thunkAPI.rejectWithValue("Token bulunamadı");
    }
    try {
      const response = await fetch("http://localhost:8000/api/users/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return thunkAPI.rejectWithValue(await response.json());
      }

      return await response.json(); // {id, name, is_admin, ...}
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.currentUser = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Çıkış yapıldı.");
    },
    setLogin: (state, action) => {
      const token = localStorage.getItem("accessToken");
      state.accessToken = token;
      state.currentUser = action.payload || null; // varsa user bilgisini de koy
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create user
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.currentUser = action.payload;
        }
      )
      .addCase(createUserAsync.rejected, (state) => {
        state.loading = false;
      })

      // Login
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = false;
        state.accessToken = null;
      })

      // Favori toggle optimistic
      .addCase(toggleFavoriteAsync.pending, (state, action) => {
        toggleFavoriteLocally(state, action.meta.arg); // UI anında değişir
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleFavoriteAsync.rejected, (state, action) => {
        toast.error("Favori güncellenemedi.");
        toggleFavoriteLocally(state, action.meta.arg); // Rollback
      })
      .addCase(fetchUserFavoritesAsync.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsersAsync.rejected, (state) => {
        toast.error("Kullanıcılar alınırken hata oluştu!");
        state.loading = false;
      })
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.currentUser = action.payload;
        }
      )
      .addCase(fetchUserAsync.rejected, (state) => {
        state.loading = false;
        state.currentUser = null;
      });
  },
});

export const { logout, setLogin, toggleLoading } = userSlice.actions;
export default userSlice.reducer;
