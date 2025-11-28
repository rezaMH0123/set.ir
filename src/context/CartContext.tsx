"use client";

import { getCartData } from "@/core/apiCalls/cart";
import { CartItem } from "@/types/cart.type";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

type coupon = {
  id: string;
  name: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<boolean>;
  addBulkToCart: (products: CartItem[]) => Promise<boolean>;
  removeFromCart: (id: string) => Promise<boolean>;
  clearCart: () => void;
  totalPrice: string;
  totalItems: number;
  totalDiscount: string;
  priceToPay: string;
  appliedCoupon: coupon | null;
  applyCoupon: ({ id, name }: coupon) => Promise<boolean>;
  isProductInCart: (productId: string) => boolean;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [lsCart, setlsCart] = useState<CartItem[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // first render
  const [totalDiscount, setTotalDiscount] = useState("");
  const [priceToPay, setPriceToPay] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<coupon | null>(null);
  const [totalPrice, setTotalPrice] = useState("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const fillLs = async () => {
      const storedCart = localStorage.getItem("cart");
      const tmpLsCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      try {
        const {
          product: cart,
          finalPrice: priceToPay,
          totalDiscount,
          totalPrice,
        } = await getCartData(
          tmpLsCart.map((item) => item.id),
          ""
        );
        if (cart?.length > 0) {
          setlsCart(cart);
          setPriceToPay(priceToPay);
          setTotalDiscount(totalDiscount);
          setTotalPrice(totalPrice);
        }
        setIsInitialLoad(false);
      } catch {
        setlsCart(tmpLsCart);
        setIsInitialLoad(false);
      }
    };

    fillLs();
  }, []);

  // Save cart to localStorage on change (after initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("cart", JSON.stringify(lsCart));
    }
  }, [lsCart, isInitialLoad]);

  const updateLsCart = async (
    newLsCart: CartItem[],
    coupon?: coupon
  ): Promise<boolean> => {
    if (coupon && coupon.id !== "") {
      try {
        const {
          product: cart,
          finalPrice: priceToPay,
          totalDiscount,
          totalPrice,
        } = await getCartData(
          newLsCart.map((item) => item.id),
          coupon.id
        );
        setlsCart(cart);
        setPriceToPay(priceToPay);
        setTotalDiscount(totalDiscount);
        setTotalPrice(totalPrice);
        setAppliedCoupon({ id: coupon.id, name: coupon.name });
        return true;
      } catch {
        return false;
      }
    } else {
      try {
        const {
          product: cart,
          finalPrice: priceToPay,
          totalDiscount,
          totalPrice,
        } = await getCartData(newLsCart.map((item) => item.id));
        setlsCart(cart);
        setPriceToPay(priceToPay);
        setTotalDiscount(totalDiscount);
        setTotalPrice(totalPrice);
        setAppliedCoupon(null);
        return true;
      } catch {
        return false;
      }
    }
  };

  const isProductInCart = useCallback(
    (productId: string) => {
      return !!lsCart.find((item) => item.id === productId)?.id;
    },
    [lsCart]
  );

  const addToCart = (addingItem: CartItem) => {
    const newLsCart = [...lsCart, addingItem];
    localStorage.setItem("cart", JSON.stringify(newLsCart));
    return updateLsCart(newLsCart, appliedCoupon ?? undefined);
  };

  const addBulkToCart = (addingItems: CartItem[]) => {
    // Filter out items that are already in the cart
    const existingIds = new Set(lsCart.map((item) => item.id));
    const itemsToAdd = addingItems.filter((item) => !existingIds.has(item.id));
    const newLsCart = [...lsCart, ...itemsToAdd];
    localStorage.setItem("cart", JSON.stringify(newLsCart));
    return updateLsCart(newLsCart, appliedCoupon ?? undefined);
  };

  const removeFromCart = (id: string) => {
    const newLsCart = lsCart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newLsCart));
    if (newLsCart.length === 0) {
      clearCart();
      return Promise.resolve(true);
    } else {
      return updateLsCart(newLsCart, appliedCoupon ?? undefined);
    }
  };

  const clearCart = () => {
    setlsCart([]);
    setAppliedCoupon(null);
    setPriceToPay("");
    setTotalDiscount("");
    setTotalPrice("");
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const applyCoupon = useCallback(
    (coupon: coupon) => updateLsCart(lsCart, coupon),
    [lsCart]
  );

  return (
    <CartContext.Provider
      value={{
        cart: lsCart,
        addToCart,
        addBulkToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems: lsCart.length,
        totalDiscount,
        priceToPay,
        appliedCoupon,
        applyCoupon: applyCoupon,
        isProductInCart,
        isLoading: isInitialLoad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
