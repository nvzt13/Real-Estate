import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

 const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

const initialState: UserState = {
  user: null,
  accessToken: token,
  loading: false,
  isLoggedIn: false
};


// Kullanıcı kayıt işlemi
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData: User, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      console.log("Kullanıcı kaydı sırasında hata:", error);
      return thunkAPI.rejectWithValue("Bir hata oluştu");
    }
  }
);

// Kullancı login işlemi
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
        return thunkAPI.rejectWithValue(errorData);
      }

      const data = await response.json(); // içinde access ve refresh var
      toast.success("Giriş başarılı!");

      // Token'ı localStorage’a kaydet
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      return {
        accessToken: data.access,
        refreshToken: data.refresh,
        email: userData.email, // Kullanıcıyı çekmek için gerekebilir
      };
    } catch (error) {
      toast.error("Giriş sırasında bir hata oluştu.");
      return thunkAPI.rejectWithValue("Bir hata oluştu");
    }
  }
);
 
// Toggle faworite 
export const toggleFavoriteAsync = createAsyncThunk(
  "user/toggleFavorite",
  async (userId: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { users: UserState };
      const token = `${state.users.accessToken}`;
      console.log("Token:", token);
      const response = await fetch(`http://localhost:8000/api/users/6/toggle_favorite/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ listing_id : userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Favori durumu güncellenirken hata:", errorData);
        return thunkAPI.rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Favori durumu güncellenirken hata:", error);
      return thunkAPI.rejectWithValue("Bir hata oluştu");
    }
  }
);

// userSlice 
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Çıkış yapıldı.");
    },
    setIsLoggin:(state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true; 
    }
  },
  extraReducers: (builder) => {
    builder
    // Kullanıcıları çekme işlemi
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(
        createUserAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      )
      // Login işlemi
      .addCase(
        loginUserAsync.pending,
        (state) => {
        state.loading = true;
      }
     )
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.accessToken = action.payload.accessToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        loginUserAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.isLoggedIn = false;
          state.accessToken = null;
        }
      )
      // faworite işlemleri
      .addCase(
        toggleFavoriteAsync.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        toggleFavoriteAsync.fulfilled,
        (state) => {
          state.loading = false;
          toast.success("Favori durumu güncellendi.");
        }
      )
      .addCase(
        toggleFavoriteAsync.rejected,
        (state) => {
          state.loading = false;
          toast.error("Favori durumu güncellenemedi.");
        }
      )
  },
});

export default userSlice.reducer;
export const { logout, setIsLoggin } = userSlice.actions;