"use client";
import React, { useState, useCallback } from "react";
import { useModal } from "@/context/ModalContext";
import Modal from "./Modal";

type ModalWrapperProps = {
  modalId: string;
  triggerButton: React.ReactNode;
  children: React.ReactNode;
  modalWidth?: string;
  modalHeight?: string;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
};

export default function ModalWrapper({
  triggerButton,
  modalId,
  children,
  modalWidth = "fit-content",
  modalHeight = "fit-content",
  onClose,
  onOpenChange,
}: ModalWrapperProps) {
  const [localOpen, setIsOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    openModal(modalId);
    document.body.classList.add("!overflow-hidden");
    onOpenChange?.(true);
  }, [modalId, onOpenChange, openModal]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    closeModal(modalId);
    document.body.classList.remove("!overflow-hidden");
    onClose?.();
    onOpenChange?.(false);
  }, [modalId, onClose, onOpenChange, closeModal]);

  return (
    <>
      <div onClick={handleOpen} className="w-full inline-block cursor-pointer">
        {triggerButton}
      </div>

      <Modal
        isOpen={isOpen(modalId) && localOpen}
        onClose={handleClose}
        modalWidth={modalWidth}
        modalHeight={modalHeight}
      >
        {children}
      </Modal>
    </>
  );
}
