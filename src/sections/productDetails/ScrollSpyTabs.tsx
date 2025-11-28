"use client";

import { useEffect, useState } from "react";

export default function ScrollSpyTabs() {
  const [active, setActive] = useState<string | null>(null);
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    const updateSections = () => {
      const foundSections = Array.from(
        document.querySelectorAll("[data-section]")
      )
        .filter((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== "none";
        })
        .map((el) => ({
          id: el.id,
          label: el.getAttribute("data-label") || el.id,
        }));

      setSections(foundSections);
    };

    updateSections();

    const observer = new MutationObserver(() => {
      updateSections();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", updateSections);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSections);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el || el.offsetParent === null) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 120) {
          setActive(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -140;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="sticky top-20 md:top-32 z-20  mt-8 bg-white h-12 flex items-center gap-5 px-3 border-b border-LightGray">
      {sections.map((item) => (
        <span
          key={item.id}
          className={`cursor-pointer text-sm pb-1 transition-all ${
            active === item.id
              ? "border-b-2 border-black text-black"
              : "text-zinc-400"
          }`}
          onClick={() => handleScrollTo(item.id)}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
