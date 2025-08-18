import { Message, MessageType } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MessageState {
  userMessages: Message[]; 
  singleUserMessages: Message[];
  loading: boolean;
}

const initialState: MessageState = {
  userMessages: [],
  singleUserMessages: [],
  loading: false,
};
// fetch  messages for user
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:8000/api/messages/", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Mesajlar getirilemedi");
    }

    return await res.json();
  }
);

// fetch messages for admin
export const fetchMessagesByUserId = createAsyncThunk(
  "messages/userMessages",
  async (userId: number) => {
    const response = await fetch(`http://localhost:8000/api/users/${userId}/messages/`);
    if (!response.ok) {
      throw new Error("Kullanıcının mesajları getirilemedi");
    }
    const data = await response.json();
    return data;
  }
);

// send messages
export const sendMessage = createAsyncThunk("message/sendMessage", async (message: MessageType) => {
console.log("message")
  const token = localStorage.getItem("accessToken");
   try{
     const response = await fetch('http://localhost:8000/api/messages/', {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}` 
       },
        body: JSON.stringify(message),
     })
      if (!response.ok) {
        throw new Error("Mesaj gönderilemedi");
      }
      const data = await response.json();
      return data;
   }
   catch(error) {
     console.log("hate", error)
   }
})
// message Slice
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.userMessages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      })

      // fetchMessagesByUserId
      .addCase(fetchMessagesByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUserMessages = action.payload;
      })
      .addCase(fetchMessagesByUserId.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default messageSlice.reducer;