"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "@/lib/slice/listingSlice";
import { AppDispatch } from "@/lib/store";
import { setIsLoggin } from "@/lib/slice/userSlice";

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
    </div>
  );
};

export default FillReduxStore;
