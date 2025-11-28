"use client";

import { baseIcons } from "@/assets/icons";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div
      className="relative rounded-[16px] my-3 py-3 px-4 pl-12 max-sm:pl-8 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] cursor-pointer max-sm:text-sm"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Image
        src={baseIcons.arrowDownIcon}
        className="absolute left-6 max-sm:left-3 top-1/2 -translate-y-1/2"
        alt="arrow-down"
      />
      <div className="py-1 font-medium">
        <p>{question}</p>
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight, transition: "max-height 0.3s ease-in-out" }}
        className="overflow-hidden font-light"
      >
        <p className="mt-2 ">{answer}</p>
      </div>
    </div>
  );
}
