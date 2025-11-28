"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";

export default function ToastClient() {
  const [toastMessage, setToastMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const message = getCookie("toast");
    if (message) {
      setToastMessage(message as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCookie("toast")]);

  useEffect(() => {
    if (toastMessage === "login-required") {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      deleteCookie("toast");
      setToastMessage("");
    }
  }, [toastMessage]);

  return null;
}
