"use client"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "@/lib/slice/listingSlice";
import { RootState, AppDispatch } from "@/lib/store";

const ListingList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { listings, loading } = useSelector((state: RootState) => state.listings);

  useEffect(() => {
    dispatch(fetchListings());
    console.log(listings)
  }, [dispatch]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div>
     
    </div>
  );
};

export default ListingList;
