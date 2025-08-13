import { Message } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



interface MessageState {
  list: Message[];
  loading: boolean;
}
const initialState: MessageState = {
  list: [],
  loading: false,
};


export const fetchMessages = createAsyncThunk<Message[], string>(
  "messages/fetchMessages",
  async (token: string) => {
    const res = await fetch("http://localhost:8000/api/messages/", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    console.log("Messages fetched:", data);
    return data;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default messageSlice.reducer;
