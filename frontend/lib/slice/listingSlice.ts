// features/listing/listingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Listing } from "@/types/types";

// Başlangıç durumu
const initialState: {
  listings: Listing[];
  loading: boolean;
} = {
  listings: [],
  loading: false,
};

// Tüm ilanları getir
export const fetchListings = createAsyncThunk("listings/fetchAll", async () => {
  const res = await fetch("http://localhost:8000/api/listings/");
  if (!res.ok) throw new Error("İlanlar getirilemedi");
  const data = await res.json();
  return data.data; // Eğer Django şu şekilde dönüyorsa: { "data": [...] }
});

// Yeni ilan ekle
export const addListing = createAsyncThunk(
  "listings/add",
  async (formData: FormData, { dispatch }) => {
    const res = await fetch("/api/v2/listings", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("İlan eklenemedi");
    const newListing = await res.json();
    dispatch(fetchListings());
    return newListing;
  }
);

// İlan güncelle
export const updateListing = createAsyncThunk(
  "listings/update",
  async (
    { listingId, formData }: { listingId: string; formData: FormData },
    { dispatch }
  ) => {
    const res = await fetch(`/api/v2/listings/${listingId}/`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw new Error("İlan güncellenemedi");
    const updated = await res.json();
    dispatch(fetchListings());
    return updated;
  }
);

// İlanın uygunluk durumunu değiştir
export const toggleAvailability = createAsyncThunk(
  "listings/toggleAvailability",
  async ({ listingId }: { listingId: string }) => {
    const res = await fetch(`/api/v2/listings/${listingId}/toggle/`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Durum değiştirilemedi");
    return await res.json();
  }
);

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.listings = action.payload;
        state.loading = false;
      })
      .addCase(fetchListings.rejected, (state) => {
        state.loading = false;
        alert("İlanlar getirilemedi");
      })

      .addCase(addListing.fulfilled, (state, action) => {
        state.listings.push(action.payload);
      })

      .addCase(updateListing.fulfilled, (state, action) => {
        const index = state.listings.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
      })

      .addCase(toggleAvailability.fulfilled, (state, action) => {
        const index = state.listings.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
      });
  },
});

export default listingSlice.reducer;
