"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Item = {
  id: number;
  name: string;
};

type Props = {
  categories: Item[];
  grades: Item[];
  majors: Item[];
  lessons: Item[];
};

export default function BreadcrumbsClient({
  categories,
  grades,
  majors,
  lessons,
}: Props) {
  const router = useRouter();
  const levels = [
    { name: "categories", data: categories },
    { name: "grades", data: grades },
    { name: "majors", data: majors },
    { name: "lessons", data: lessons },
  ];

  const handleClick = (clickedLevel: string) => {
    const breadcrumbPath: string[] = [];
    const queryParts: string[] = [];

    for (const level of levels) {
      if (level.data.length > 0) {
        const ids = level.data.map((i) => i.id);
        const names = level.data.map((i) => i.name).join(" ، ");

        breadcrumbPath.unshift(names);

        ids.forEach((id) => {
          queryParts.push(`${level.name}=${id}`);
        });
      }

      if (level.name === clickedLevel) break;
    }

    const queryString = queryParts.join("&");

    router.push(`/filter?${queryString}`);
  };

  const renderLevel = (
    levelName: string,
    items: Item[],
    showChevron: boolean
  ) => {
    if (items.length === 0) return null;

    const combinedText = items.map((i) => i.name).join(" ، ");

    return (
      <span className="flex  items-center text-zinc-500 text-sm p-1">
        <div
          className="cursor-pointer flex flex-nowrap whitespace-nowrap items-center"
          onClick={() => handleClick(levelName)}
        >
          {combinedText}
        </div>
        {showChevron && (
          <ChevronLeft className="stroke-zinc-500 w-4 h-4 mr-2" />
        )}
      </span>
    );
  };

  return (
    <div
      className="flex  items-center text-zinc-500 text-sm p-1 max-w-full md:max-w-[700px] overflow-x-scroll px-4 md:px-0"
      dir="rtl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "خانه",
                item: "https://set.ir",
              },
              ...categories.map((c, idx) => ({
                "@type": "ListItem",
                position: idx + 2,
                name: c.name,
                item: `https://set.ir/category/${c.id}`,
              })),
              ...grades.map((g, idx) => ({
                "@type": "ListItem",
                position: categories.length + idx + 2,
                name: g.name,
                item: `https://set.ir/grade/${g.id}`,
              })),
              ...majors.map((m, idx) => ({
                "@type": "ListItem",
                position: categories.length + grades.length + idx + 2,
                name: m.name,
                item: `https://set.ir/major/${m.id}`,
              })),
              ...lessons.map((l, idx) => ({
                "@type": "ListItem",
                position:
                  categories.length + grades.length + majors.length + idx + 2,
                name: l.name,
                item: `https://set.ir/lesson/${l.id}`,
              })),
            ],
          }),
        }}
      />

      <div className="flex items-center">
        <Link href={"/"} className="cursor-pointer">
          خانه
        </Link>
        <ChevronLeft className="stroke-zinc-500 w-4 h-4 mr-2" />
      </div>
      {renderLevel(
        "categories",
        categories,
        grades.length > 0 || majors.length > 0 || lessons.length > 0
      )}
      {renderLevel("grades", grades, majors.length > 0 || lessons.length > 0)}
      {renderLevel("majors", majors, lessons.length > 0)}
      {renderLevel("lessons", lessons, false)}
    </div>
  );
}
