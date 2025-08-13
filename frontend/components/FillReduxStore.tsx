"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "@/lib/slice/listingSlice";
import { AppDispatch } from "@/lib/store";
import { setIsLoggin, fetchUserFavoritesAsync, toggleLoading, fetchAllUsersAsync} from "@/lib/slice/userSlice";
import { fetchMessages } from "@/lib/slice/messageSlice";

const FillReduxStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setIsLoggin(token));
      dispatch(fetchMessages(token));
    }
    dispatch(fetchListings());
    dispatch(fetchUserFavoritesAsync(3));
    dispatch(fetchAllUsersAsync());

  }, [dispatch]);
  
  return (
    <div>
    </div>
  );
};

export default FillReduxStore;
