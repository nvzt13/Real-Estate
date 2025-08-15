import { Message } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface MessageState {
  list: Message[]; 
  singleUserMessage: Message[];
  loading: boolean;
}

const initialState: MessageState = {
  list: [],
  singleUserMessage: [],
  loading: false,
};
// fetch  messages for user
export const fetchMessages = createAsyncThunk<Message[], string>(
  "messages/fetchMessages",
  async (token: string) => {
    
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
export const fetchMessagesByUserId = createAsyncThunk<Message[], string>(
  "messages/userMessages",
  async (userId) => {
    const response = await fetch(`http://localhost:8000/api/users/${userId}/messages`);
    if (!response.ok) {
      throw new Error("Kullanıcının mesajları getirilemedi");
    }
    const data = await response.json();
    return data;
  }
);

// send messages
export const sendMessage = createAsyncThunk("message/sendMessage", async (token) => {
  console.log(token)
  const message = {
  "sender": 1,
  "content": "Merhaba, bu 2. bir test mesajıdır."
}
   try{
     const response = await fetch('http://localhost:8000/api/messages/', {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}` 
       },
        body: JSON.stringify(message),
     })
   }
   catch(error) {
     console.log(error)
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
        state.list = action.payload;
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
        state.singleUserMessage = action.payload;
      })
      .addCase(fetchMessagesByUserId.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default messageSlice.reducer;