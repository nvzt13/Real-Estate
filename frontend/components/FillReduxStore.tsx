"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "@/lib/slice/listingSlice";
import { AppDispatch } from "@/lib/store";

const FillReduxStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);
  
  return (
    <div>
    </div>
  );
};

export default FillReduxStore;
