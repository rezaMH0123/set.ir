"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import baseImages from "@/assets/images";

export const OpportunitiesReadme = () => {
  const [showOpen, setShowOpen] = useState(false);
  const [openSlideIn, setOpenSlideIn] = useState(false);

  useEffect(() => {
    let tid: NodeJS.Timeout;
    if (showOpen) {
      tid = setTimeout(() => {
        setOpenSlideIn(true);
      }, 20);
    } else {
      setOpenSlideIn(false);
    }
    return () => clearTimeout(tid);
  }, [showOpen]);

  const handleClick = () => {
    if (!showOpen) {
      setShowOpen(true);
    } else {
      setOpenSlideIn(false);
      setTimeout(() => {
        setShowOpen(false);
      }, 500);
    }
  };

  return (
    <div className="fixed z-10 right-0 top-1/2 transform -translate-y-1/2 overflow-hidden cursor-pointer">
      <div
        className={`relative overflow-hidden h-[300px] transition-all 
    ${
      showOpen && openSlideIn
        ? "w-[500px] max-sm:w-[270px] delay-0"
        : "w-[100px] max-sm:w-[50px] delay-[500ms]"
    }
  `}
      >
        {showOpen && (
          <div
            onClick={handleClick}
            className={`
              absolute top-0 -right-1
              transition-transform duration-500
              ${
                openSlideIn
                  ? "translate-x-0"
                  : "translate-x-[430px] max-sm:translate-x-[220px]"
              }
            `}
          >
            <Image
              src={baseImages.opportunitiesReadmeOpen}
              className="h-[300px] hidden object-contain min-sm:block"
              alt="Readme Open"
              unoptimized
            />
            <Image
              src={baseImages.opportunitiesReadmeOpen}
              className="h-[140px] md:hidden object-contain min-sm:block"
              alt="Readme Open"
              unoptimized
            />
          </div>
        )}

        {!showOpen && (
          <div onClick={handleClick} className="absolute top-0 -right-1">
            <Image
              src={baseImages.opportunitiesReadmeClosed}
              className="h-[300px] hidden min-sm:block"
              alt="Readme Closed"
              width={100}
              height={280}
            />

            <Image
              src={baseImages.opportunitiesReadmeClosedMobile}
              className="h-[140px] hidden max-sm:block"
              alt="Readme Closed Mobile"
              width={50}
              height={140}
            />
          </div>
        )}
      </div>
    </div>
  );
};
