"use client";
import { useEffect } from "react";
import IconCancle from "../icons/IconCancle";
import MobileModalPortal from "../MobileModalPortal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalWidth?: string;
  modalHeight?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  modalWidth,
  modalHeight,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <MobileModalPortal>
      <div
        dir="rtl"
        className="fixed inset-0 h-[100vh] md:overflow-hidden flex items-center overflow-auto justify-center bg-white md:bg-black/50 z-[9998]"
      >
        <div
          className="bg-white p-6 max-sm:px-3 rounded-lg md:shadow-xl relative"
          style={{ minWidth: modalWidth, minHeight: modalHeight }}
        >
          <IconCancle
            className="absolute left-5 md:top-6  text-xl fill-[#262626] cursor-pointer"
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    </MobileModalPortal>
  );
}
