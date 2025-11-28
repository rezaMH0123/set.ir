"use client";
import { BASE_IMAGE_URL } from "@/configs/globals";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WelcomeModal = ({
  desktop,
  link,
  mobile,
}: {
  link: string;
  desktop: string;
  mobile: string;
}) => {
  const [open, setOpen] = useState(false);

  const [dtImgLoaded, setDtImgLoaded] = useState(false);
  const [mbImgLoaded, setMbImgLoaded] = useState(false);

  useEffect(() => {
    const prevClosedModal = localStorage.getItem("modal");
    if (prevClosedModal !== desktop + mobile) {
      setOpen(true);
    }
  }, [mobile, desktop]);

  const handleClose = () => {
    localStorage.setItem("modal", desktop + mobile);
    setOpen(false);
  };

  if (!open || !desktop || !mobile) return null;

  return (
    <div
      onClick={handleClose} //dont add stop propagation here
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm w-full h-[100vh]"
    >
      <div className="w-full h-[100vh] place-items-center place-content-center">
        <div className="h-2/3 relative ">
          <Link aria-label="مودال خوش آمد گویی" href={link ?? ""}>
            <Image
              width={800}
              height={800}
              src={BASE_IMAGE_URL + desktop}
              alt="مودال خوش آمد گویی"
              onLoad={() => setDtImgLoaded(true)}
              className={`object-contain w-fit hidden md:block h-full rounded-xl transition-opacity duration-300 ${dtImgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </Link>
          <Link aria-label="مودال خوش آمد گویی" href={link ?? ""}>
            <Image
              height={800}
              width={800}
              src={BASE_IMAGE_URL + mobile}
              alt="مودال خوش آمد گویی"
              onLoad={() => setMbImgLoaded(true)}
              className={`object-contain w-fit md:hidden block h-full rounded-xl transition-opacity duration-300 ${mbImgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </Link>
          <X
            onClick={handleClose}
            className="cursor-pointer absolute top-4 left-4 text-white md:hover:text-gray-900 md:text-gray-500 text-2xl"
            aria-label="بستن"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
