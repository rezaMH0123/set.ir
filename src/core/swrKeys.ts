const SWR_KEYS = {
  favorites: "favorites",
  ticketList: "tickets",
  ticketMessages: (id: string) => `tickets/messages/${id}`,
  userProfile: "user/profile",
  grades: "grades",
  majors: "majors",
  purchasedVideos: "GetUserPurchasedProducts",
  ordersList: "Order/ListByUserId",
  ordersItems: (id: string) => `Order/View/${id}`,
  sliderProducts: (url: string) => `/slider-products/${url}`,
  navbarMenue: "navbarMenue",
  cart: "cart",
  wallet: "wallet",
  comments: (id: string) => `comments/${id}`,
};

export default SWR_KEYS;
