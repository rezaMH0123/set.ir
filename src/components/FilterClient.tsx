"use client";

import { useFilter } from "@/context/FilterContext";

export default function FilterClient() {
  const { finalFilters } = useFilter();

  return (
    <div>
      <h2>فیلترهای انتخاب‌شده:</h2>
      <ul>
        {finalFilters.map((f) => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}
