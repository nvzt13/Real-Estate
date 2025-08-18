// features/listing/listingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Listing } from "@/types/types";
import { toast } from 'react-toastify'
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
  return data; // Eğer Django şu şekilde dönüyorsa: { "data": [...] }
});

// Yeni ilan ekle
export const addListing = createAsyncThunk(
  "listings/add",
  async (formData: Listing, { dispatch }) => {
    try {
       const res = await fetch("http://localhost:8000/api/listings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      for (const key in errorData) {
        toast.error(errorData[key][0])
      }
    };
    const newListing = await res.json();
    dispatch(fetchListings());
    toast.success("İlan başarılı bir şekilde eklendi!")
    return newListing;
    } catch (error) {
  console.log(error);

  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error(String(error));
  }
}
  }
);


// ilanı sil
export const deleleteListing = createAsyncThunk(
  "lisitngs/delete",
  async (id: string) => {
    const res = await fetch(`http://localhost:8000/api/listings/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) toast.error("İlan silinirken bir hata oluştu!")
    toast.success("İlan başarılı bir şekilde silindi!");
    const deleted = await res.json();
    return deleted;
  }
);
// İlan güncelle
export const updateListing = createAsyncThunk(
  "listings/update",
  async (formData: Listing, { dispatch }) => {
    console.log(formData);
    try {
      const res = await fetch(
        `http://localhost:8000/api/listings/${formData.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Added missing Content-Type header
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) toast.error("İlan güncellenirken bir hata oluştu!")
      const updated = await res.json();
      dispatch(fetchListings());
      toast.success("İlan başarılı bir şekilde güncellendi!")
      return updated;
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      throw error;
    }
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
      .addCase(addListing.pending, (state) =>{
        state.loading = true
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.listings.push(action.payload);
        state.loading = false;
      })
      .addCase(addListing.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        const index = state.listings.findIndex(
          (l) => l.id === action.payload.id
        );
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
      })

      .addCase(toggleAvailability.fulfilled, (state, action) => {
        const index = state.listings.findIndex(
          (l) => l.id === action.payload.id
        );
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
      });
  },
});

export default listingSlice.reducer;
