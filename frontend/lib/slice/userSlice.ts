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

const initialState: UserState = {
  user: null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  loading: false,
  isLoggedIn:
    typeof window !== "undefined"
      ? !!localStorage.getItem("accessToken")
      : false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.users.push(action.payload);
        }
      )
      .addCase(
        createUserAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      )
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.accessToken = action.payload.accessToken;
          state.isLoggedIn = true;
          state.user = {
            name: "",
            lastName: "",
            email: action.payload.email,
            password: "",
          };
        }
      );
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;