export interface SelectOptionsType {
  id: string;
  name: string;
}
export interface OrderType {
  id: string;
  status: string;
  totalPrice: string;
  discountAmount: string;
  createdAt: string;
  customRefId?: string;
}

export interface messageType {
  createdAt: string;
  id: string;
  isAdmin: boolean;
  text: string;
}

export type walletType = {
  amount: string;
  transitionsDetail: {
    amount: string;
    type: "Charge" | "Purchase" | "FailedCharge";
    purpose: "OrderPurchase" | "WalletDeposit";
    transitionsnDate: string;
    customRefId: string;
    isDirect?: boolean;
  }[];
};
