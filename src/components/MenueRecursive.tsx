import React, { useState } from "react";

type Category = {
  id: string;
  name: string;
  children?: Category[] | null;
};

type HoverState = {
  [key: string]: string | null;
};

type MenueRecursiveProps = {
  categories: Category;
};

const renderMenu = (
  categories: Category[],
  level: string,
  hoveredStates: HoverState,
  setHoveredStates: React.Dispatch<React.SetStateAction<HoverState>>,
  handleMouse: (type: "enter" | "leave", level: string, id: string) => void
) => {
  return categories.map((category) => (
    <li
      key={category.id}
      className="cursor-pointer text-blue-500 hover:text-blue-700"
      onMouseEnter={() => handleMouse("enter", level, category.id)}
      onMouseLeave={() => handleMouse("leave", level, category.id)}
    >
      {category.name}

      {hoveredStates[level] === category.id && category.children && (
        <div className="absolute right-full top-0 w-48 pr-4 py-2 bg-white rounded-bl-xl transition-all duration-300 z-10 min-h-[450px] flex flex-col">
          <ul className="space-y-3 flex-grow">
            {renderMenu(
              category.children,
              `${level}-${category.id}`,
              hoveredStates,
              setHoveredStates,
              handleMouse
            )}
          </ul>
        </div>
      )}
    </li>
  ));
};

export default function MenueRecursive({ categories }: MenueRecursiveProps) {
  const [hoveredStates, setHoveredStates] = useState<HoverState>({
    category: null,
    child: null,
    subChild: null,
    subSubChild: null,
  });

  const handleMouse = (type: "enter" | "leave", level: string, id: string) => {
    if (type === "enter") {
      setHoveredStates((prev) => ({ ...prev, [level]: id }));
    } else if (type === "leave") {
      setHoveredStates((prev) => {
        setTimeout(() => {
          setHoveredStates((prev) => ({ ...prev, [level]: null }));
        }, 200);
        return prev;
      });
    }
  };

  return (
    <div
      dir="rtl"
      className="relative group bg-white"
      onMouseEnter={() =>
        setHoveredStates((prev) => ({ ...prev, category: categories.id }))
      }
      onMouseLeave={() => handleMouse("leave", "category", categories.id)}
    >
      <span className="cursor-pointer text-blue-600 font-semibold inline-block">
        {categories.name}
      </span>

      {categories.children && (
        <div
          className={`absolute right-0 mt-4 w-[75px] pr-4 py-2 bg-Primary-50 rounded-br-xl
            ${
              hoveredStates.category === categories.id
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }
            transition-all duration-300 z-10 min-h-[450px] flex flex-col`}
        >
          <ul className="space-y-3 flex-grow ">
            {renderMenu(
              categories.children,
              "category",
              hoveredStates,
              setHoveredStates,
              handleMouse
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
