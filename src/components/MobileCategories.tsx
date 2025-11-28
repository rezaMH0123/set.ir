"use client";

import { JSX, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import MobileModalPortal from "./MobileModalPortal";
import { useFilter } from "@/context/FilterContext";
import { handleCategoryClick } from "@/utils/helpers/handleCategoryClick";

type NavbarMenu = {
  id: string;
  name: string;
  persianType: string;
  englishType: string;
  threadId: string;
  children: NavbarMenu[] | null;
};

const MobileCategories: React.FC<{
  categories: NavbarMenu[];
  triggerButton: JSX.Element;
}> = ({ categories, triggerButton }) => {
  const [currentCategory, setCurrentCategory] = useState<NavbarMenu | null>(
    null
  );
  const [animate, setAnimate] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const router = useRouter();
  const { setSelectedFilters } = useFilter();

  useEffect(() => {
    document.body.style.overflow = modalStatus ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalStatus]);

  const closeModal = () => {
    setModalStatus(false);
    setCurrentCategory(null);
  };
  const openModal = () => setModalStatus(true);

  const handleBack = () => {
    setCurrentCategory((prev) => {
      if (!prev) return null;
      const parentThreadId = prev.threadId.split("-").slice(0, -1).join("-");
      const findParent = (items: NavbarMenu[]): NavbarMenu | null => {
        for (const item of items) {
          if (item.threadId === parentThreadId) return item;
          if (item.children) {
            const found = findParent(item.children);
            if (found) return found;
          }
        }
        return null;
      };
      return findParent(categories);
    });
  };

  const displayedCategories = currentCategory?.children || categories;

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }, [currentCategory]);

  return (
    <>
      <div
        onClick={openModal}
        className="flex flex-col gap-y-1.5 justify-center items-center"
      >
        {triggerButton}
      </div>

      <AnimatePresence>
        {modalStatus && (
          <MobileModalPortal>
            <motion.div
              key="modal-backdrop"
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            />
            <motion.div
              key="modal-content"
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl px-4 pb-16 overflow-y-auto no-scrollbar"
              initial={{ height: 0 }}
              animate={{ height: "80vh" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full mx-auto rounded-xl overflow-hidden bg-white p-4 pt-8">
                {currentCategory ? (
                  <div className="w-full font-bold flex flex-row justify-between items-center mb-6">
                    <div
                      onClick={() =>
                        handleCategoryClick({
                          threadId: currentCategory.threadId,
                          categories,
                          goToCategory: false,
                          setSelectedFilters,
                          router,
                          closeModal,
                          resetCurrentCategory: () => setCurrentCategory(null),
                        })
                      }
                    >
                      <ArrowLeft className="text-blue1 inline mx-1" />
                      <label className="text-blue1 inline">{`تمام محصولات ${currentCategory.name}`}</label>
                    </div>
                    <div onClick={handleBack}>
                      <ArrowRight className="text-black inline mx-1" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full relative text-center mb-8 font-bold">
                    <X
                      className="text-black absolute left-4"
                      onClick={closeModal}
                    />
                    <label className="place-self-center">مقاطع</label>
                  </div>
                )}

                {displayedCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`shadow-[0px_2px_6px_0px_#00000038] my-4 p-2 rounded-2xl ${
                      animate ? "fade-in" : ""
                    }`}
                  >
                    <button
                      className="w-full text-left px-4 py-2.5 font-semibold bg-white transition flex flex-row-reverse justify-between items-center"
                      onClick={() => {
                        if (category.children) {
                          setCurrentCategory(category);
                        } else {
                          handleCategoryClick({
                            threadId: category.threadId,
                            categories,
                            goToCategory: true,
                            setSelectedFilters,
                            router,
                            closeModal,
                            resetCurrentCategory: () =>
                              setCurrentCategory(null),
                          });
                        }
                      }}
                    >
                      {category.name}
                      {category.children && <ChevronLeft size={24} />}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </MobileModalPortal>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileCategories;
