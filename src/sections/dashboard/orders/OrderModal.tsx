"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "@/components/modal/ModalWrapper";
import ModalProductCard from "./ModalProductCard";
import { useUserOrderItems } from "@/core/swrHooks/dashboard";
import { Product } from "@/types/slider.type";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import APP_ROUTES from "@/constants/paths";

interface OrderModalProps {
  orderId: string;
  status?: string;
  triggerButton: React.ReactNode;
  refId?: string;
}

const OrderModal: React.FC<OrderModalProps> = ({
  orderId,
  status,
  triggerButton,
  refId,
}) => {
  const [open, setOpen] = useState(false);
  const { items = [], isLoading } = useUserOrderItems(open ? orderId : null);
  const { addBulkToCart } = useCart();
  const router = useRouter();

  const handleClick = () => {
    addBulkToCart(
      (items as Product[]).map((item) => ({
        ...item,
        discountAmount: 0,
        description: "",
      }))
    );

    if (items.length) {
      document.body.classList.remove("!overflow-hidden");
      router.replace(APP_ROUTES.BASKET);
    }
  };

  useEffect(() => {
    return () => document.body.classList.remove("!overflow-hidden");
  }, []);

  return (
    <ModalWrapper
      modalId={"OrderModal" + orderId}
      triggerButton={triggerButton}
      onOpenChange={setOpen}
      modalWidth="fit-content"
    >
      <div dir="rtl" className="w-full flex items-center justify-center mt-4">
        <div className="w-full bg-white relative mt-4">
          <div className="border border-gray-200 h-[400px] max-sm:h-[480px] w-[600px] max-sm:w-[96%] place-self-center overflow-hidden rounded-[12px] pt-2 bg-[#F6F6F6] shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.26)]">
            <div className="h-full overflow-y-auto px-3 pb-3">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  در حال بارگذاری...
                </div>
              ) : (
                items?.map((item: Product) => (
                  <ModalProductCard key={item.id} data={item} />
                ))
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center px-4 max-sm:px-2 w-[600px] max-sm:w-[90%] mx-auto">
            {refId && <div> کد پیگیری: {refId}</div>}
            {status === "Pending" && (
              <button
                onClick={handleClick}
                className="cursor-pointer px-4 max-sm:w-full rounded-[10px] text-base font-semibold bg-[#224CDF] text-white py-2"
              >
                افزودن به سبد خرید
              </button>
            )}

            <div className="text-center min-w-fit mr-4 flex max-sm:block justify-center items-center max-sm:text-sm">
              <div className="mx-1 py-0.5">مجموعه هزینه ها:</div>
              <div className="mx-1 py-0.5 font-vazirFD">
                {items
                  ?.reduce(
                    (total: number, item: Product) =>
                      +total + +(item.finalPrice ?? 0),
                    0
                  )
                  .toLocaleString() == "0" ? (
                  "رایگان"
                ) : (
                  <>
                    {items
                      ?.reduce(
                        (total: number, item: Product) =>
                          +total + +(item.finalPrice ?? 0),
                        0
                      )
                      .toLocaleString()}
                    <span className="mx-1">تومان</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OrderModal;
