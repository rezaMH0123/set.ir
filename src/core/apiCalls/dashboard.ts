import { Product } from "@/types/slider.type";
import httpService from "../services/http-services";
import BACKEND_ROUTES from "../configs";
import { SelectOptionsType } from "@/types/dashboard.type";

export const getAllFavoriteProducts = async (): Promise<Product[]> => {
  const response = await httpService.get(BACKEND_ROUTES.GET_ALL_FAVORITES, {
    headers: { authRequired: true },
  });
  const items = (response.data?.data?.items as Product[]) || [];

  return items.map((product) => ({
    ...product,
    isLiked: true,
  }));
};

export const fetchTicketListByUser = async ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number;
}) => {
  const res = await httpService.get(BACKEND_ROUTES.TICKET_LIST, {
    params: { pageSize: pageSize, pageNumber: pageNumber },
    headers: { authRequired: true },
  });
  return res.data.data;
};

export const fetchTicketMessages = async (id: string) => {
  const res = await httpService.get(`${BACKEND_ROUTES.TICKET_MESSAGES}/${id}`, {
    headers: { authRequired: true },
  });
  return res.data.data;
};

export const fetchUserProfile = async () => {
  const res = await httpService.get(BACKEND_ROUTES.PROFILE_VIEW, {
    headers: { authRequired: true },
  });
  return res.data.data;
};

export const fetchGrades = async () => {
  const res = await httpService.get(BACKEND_ROUTES.GRADES, {
    headers: { authRequired: true },
  });

  return res.data.data.map((g: SelectOptionsType) => ({
    id: String(g.id),
    name: g.name,
  }));
};

export const fetchMajors = async () => {
  const res = await httpService.get(BACKEND_ROUTES.MAJORS, {
    headers: { authRequired: true },
  });

  return res.data.data.map((m: SelectOptionsType) => ({
    id: String(m.id),
    name: m.name,
  }));
};

export const fetchPurchasedVideos = async ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number;
}) => {
  const res = await httpService.get(BACKEND_ROUTES.PURCHASED_VIDEOS, {
    params: { pageSize: pageSize, pageNumber: pageNumber },
    headers: { authRequired: true },
  });

  return res.data.data;
};

export const fetchOrdersList =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ([_, pageSize, pageNumber, status]: [
    string,
    number,
    number,
    string,
  ]) => {
    const res = await httpService.get(BACKEND_ROUTES.ORDERS_LIST, {
      params: { pageSize, pageNumber, status },
      headers: { authRequired: true },
    });

    return res.data.data;
  };

export const fetchOrdersItems = async (orderId: string) => {
  const res = await httpService.get(
    `${BACKEND_ROUTES.ORDERS_ITEMS}/${orderId}`,
    {
      headers: { authRequired: true },
    }
  );

  return res.data.data;
};

export const sendMessage = async (id: string, message: string) => {
  const trimmedMessage = message.trim();
  return httpService.post(
    BACKEND_ROUTES.SEND_MESSAGE,
    { messageText: trimmedMessage, ticketId: id },
    { headers: { authRequired: true } }
  );
};

export const updateUserProfile = async (payload: Record<string, unknown>) => {
  await httpService.put(BACKEND_ROUTES.PROFILE_UPDATE, payload, {
    headers: {
      authRequired: true,
    },
  });
};

export const createTicket = async (data: Record<string, unknown>) => {
  await httpService.post(BACKEND_ROUTES.CREATE_TICKET, data, {
    headers: {
      authRequired: true,
    },
  });
};

export const getWalletDetails = async () => {
  const res = await httpService.get(BACKEND_ROUTES.GET_WALLET_DETAILS, {
    headers: {
      authRequired: true,
    },
  });

  return res?.data?.data ?? {};
};

export const postCreateWalletPaymentLink = async (amount: string) => {
  const res = await httpService.post(
    `${BACKEND_ROUTES.POST_WALLET_LINK}`,
    {
      amount: amount,
    },
    {
      headers: { authRequired: true },
    }
  );
  return res.data?.data;
};

export const likeProduct = async (pid: string) => {
  const res = await httpService.post(
    BACKEND_ROUTES.POST_ADD_FAVORITES,
    { productId: pid },
    { headers: { authRequired: true } }
  );
  return +res.status < 299;
};

export const disLikeProduct = async (pid: string) => {
  const res = await httpService.delete(BACKEND_ROUTES.POST_DEL_FAVORITES, {
    data: { productId: pid },
    headers: { authRequired: true },
  });

  return +res.status < 299;
};
