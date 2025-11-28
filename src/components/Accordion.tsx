import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type AccordionItem<T> = {
  title: string;
  content: T;
};

type AccordionProps<T> = {
  items: AccordionItem<T>[];
  withCloseAll?: boolean;
  className?: string;
  insideEachDrowpDownClassName?: string;
  wordLimit?: number;
  renderContent?: (content: T, title?: string) => React.ReactNode;
  defaultOpenIndices?: number[];
};

const Accordion = <T,>({
  items,
  renderContent,
  withCloseAll = false,
  className,
  insideEachDrowpDownClassName,
  wordLimit = 15,
  defaultOpenIndices = [],
}: AccordionProps<T>) => {
  const [openIndices, setOpenIndices] = useState<number[]>(defaultOpenIndices);
  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const closeAllHandler = () => {
    setOpenIndices([]);
  };

  return (
    <div>
      {withCloseAll && (
        <div className="text-left mb-2">
          <span onClick={closeAllHandler} className="underline cursor-pointer">
            بستن همه سرفصل ها
          </span>
        </div>
      )}

      <div
        className={`w-full  mx-auto shadow-card1 rounded-xl overflow-hidden ${className}`}
      >
        {items?.map((item, index) => (
          <div key={index} className="rounded-md">
            <button
              className="w-full text-right px-4 py-2.5 font-semibold bg-white transition flex justify-between items-center"
              onClick={() => toggle(index)}
            >
              {item.title.split(" ").length > wordLimit
                ? item.title.split(" ").slice(0, wordLimit).join(" ") + "..."
                : item.title}

              <>
                {openIndices.includes(index) ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </>
            </button>
            <AnimatePresence initial={false}>
              {openIndices.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`overflow-hidden bg-Bright1 ${insideEachDrowpDownClassName}`}
                >
                  {renderContent ? (
                    renderContent(item.content, item.title)
                  ) : (
                    <div>
                      {Array.isArray(item.content) ? (
                        <ul className="divide-y divide-MediumGray">
                          {item.content.map((sub, idx) => (
                            <li key={idx} className="px-4 py-2">
                              {sub}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
