import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

// 🔥 ASYNC THUNK: kullanıcıyı Django API'ye kaydet
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData: User, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

 if (!response.ok) {
  const errorData = await response.json();
  for (const key in errorData){
    toast.error(errorData[key][0])
  }
  return thunkAPI.rejectWithValue(errorData);
}
      const data = await response.json();
      toast.success("Kayıt işlemi başarılı!")
      return data;
    } catch (error) {
      console.log("Kullanıcı kaydı sırasında hata:", error);
      return thunkAPI.rejectWithValue("Bir hata oluştu");
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUserAsync.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;