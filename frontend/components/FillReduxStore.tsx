"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { fetchListings } from "@/lib/slice/listingSlice";
import {
  fetchUserAsync,
  fetchUserFavoritesAsync,
  fetchAllUsersAsync,
  setLogin,
} from "@/lib/slice/userSlice";
import { fetchMessages } from "@/lib/slice/messageSlice";

const FillReduxStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchListings())
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    dispatch(fetchUserAsync())
      .unwrap()
      .then((user) => {
        if (!user) return;
        dispatch(setLogin(user));
        dispatch(fetchMessages());
        dispatch(fetchUserFavoritesAsync());

        if (user.is_staff) {
          dispatch(fetchAllUsersAsync());
        }
      });
  }, [dispatch]);
  return null; // This component does not render anything
};

export default FillReduxStore;
