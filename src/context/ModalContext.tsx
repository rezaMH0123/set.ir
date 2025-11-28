"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: (modalId: string) => boolean;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

  const openModal = (modalId: string) => {
    setOpenModals((prev) => ({ ...prev, [modalId]: true }));
    document.body.classList.add("!overflow-hidden");
  };

  const closeModal = (modalId: string) => {
    if (modalId.includes("auth")) {
      setOpenModals((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (key.includes("auth")) {
            updated[key] = false;
          }
        });
        return updated;
      });
    } else {
      setOpenModals((prev) => ({ ...prev, [modalId]: false }));
    }
    setOpenModals((prev) => ({ ...prev, [modalId]: false }));
    document.body.classList.remove("!overflow-hidden");
  };

  const isOpen = (modalId: string) => {
    return !!openModals[modalId];
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
