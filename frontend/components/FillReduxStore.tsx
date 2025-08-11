"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "@/lib/slice/listingSlice";
import { AppDispatch } from "@/lib/store";
import { setIsLoggin, fetchUserFavoritesAsync} from "@/lib/slice/userSlice";

const FillReduxStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setIsLoggin(token));
    }
    dispatch(fetchListings());
    
  }, [dispatch]);
  
  return (
    <div>
      <button onClick={() => dispatch(fetchUserFavoritesAsync(6))}>test</button>
    </div>
  );
};

export default FillReduxStore;
