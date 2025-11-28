import { createPortal } from "react-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MobileModalPortal = ({ children }: Props) => {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
};

export default MobileModalPortal;
