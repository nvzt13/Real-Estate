"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchListings } from "@/lib/slice/listingSlice";
import { setIsLoggin, fetchUserAsync, fetchUserFavoritesAsync, fetchAllUsersAsync } from "@/lib/slice/userSlice";
import { fetchMessages, sendMessage } from "@/lib/slice/messageSlice";

const FillReduxStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoggedIn } = useSelector((state: RootState) => state.users);

    
  useEffect(() => {
    dispatch(fetchListings());
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (!token) return;
    dispatch(sendMessage(token))
    dispatch(setIsLoggin(token));

    dispatch(fetchUserAsync()).then((res: any) => {
      if (res.payload) {
        const isAdmin = res.payload.is_admin;
        dispatch(fetchMessages(token));
        dispatch(fetchUserFavoritesAsync(res.payload.id));

        if (isAdmin) {
          dispatch(fetchAllUsersAsync());
        }
      }
    });
  }, [dispatch]);
  return (
    <div>
    </div>
  );
};

export default FillReduxStore;