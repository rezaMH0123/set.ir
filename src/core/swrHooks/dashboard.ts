import useSWR from "swr";
import {
  getAllFavoriteProducts,
  fetchTicketListByUser,
  fetchTicketMessages,
  fetchUserProfile,
  fetchGrades,
  fetchMajors,
  fetchPurchasedVideos,
  fetchOrdersItems,
  getWalletDetails,
} from "../apiCalls/dashboard";
import SWR_KEYS from "../swrKeys";
import { User } from "@/types/user.type";
import { walletType } from "@/types/dashboard.type";

// Ticket List
export const useTicketList = (pageSize: number, pageNumber: number) => {
  const { data = [], isLoading } = useSWR(
    [SWR_KEYS.ticketList, pageSize, pageNumber],
    fetchTicketListByUser
  );
  return { tickets: data, isLoading };
};

// Ticket Messages
export const useTicketMessages = (ticketId: string | null) => {
  const { data = [], isLoading } = useSWR(
    ticketId ? SWR_KEYS.ticketMessages(ticketId) : null,
    () => fetchTicketMessages(ticketId!)
  );
  return { messages: data, isLoading };
};

// User Profile
export const useUserProfile = (isLoggedIn: boolean) => {
  const { data, isLoading } = useSWR(
    isLoggedIn ? SWR_KEYS.userProfile : null,
    fetchUserProfile
  );
  return { profile: data as User | null, isLoading };
};

// user purchased videos
export const useUserPurchasedVideos = (
  pageSize: number,
  pageNumber: number
) => {
  const { data, isLoading } = useSWR(
    [SWR_KEYS.purchasedVideos, pageSize, pageNumber],
    fetchPurchasedVideos
  );
  return { videos: data, isLoading };
};

// user order items
export const useUserOrderItems = (orderId: string | null) => {
  const { data = [], isLoading } = useSWR(
    orderId ? SWR_KEYS.ordersItems(orderId) : null,
    () => fetchOrdersItems(orderId!)
  );
  return { items: data, isLoading };
};

// Grades
export const useGrades = () => {
  const { data = [], isLoading } = useSWR(SWR_KEYS.grades, fetchGrades);
  return { grades: data, isLoading };
};

// Majors
export const useMajors = () => {
  const { data = [], isLoading } = useSWR(SWR_KEYS.majors, fetchMajors);
  return { majors: data, isLoading };
};

export const useGetFavoriteProducts = (isLoggedIn?: boolean) => {
  const { data: products = [], isLoading } = useSWR(
    isLoggedIn ? SWR_KEYS.favorites : null,
    getAllFavoriteProducts
  );

  return {
    products,
    isLoading,
  };
};

export const useGetWallet = (isLoggedIn: boolean) => {
  const { data, isLoading } = useSWR(
    isLoggedIn ? SWR_KEYS.wallet : null,
    getWalletDetails
  );

  return {
    wallet: data as unknown as walletType,
    isLoading,
  };
};
