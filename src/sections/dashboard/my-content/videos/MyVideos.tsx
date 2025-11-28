"use client";

import React from "react";
import ShowProductCard from "@/sections/dashboard/cards/ShowProductCard";

interface feature {
  name: string;
  label: string;
}

interface Product {
  id: string;
  link: string;
  thumbnailUrl: string;
  CurrentPrice: number;
  prevPrice: number;
  discount: string;
  name: string;
  features: feature[];
  isLiked: boolean;
}

interface MyVideosProps {
  products: Product[];
}

export default function MyVideos({ products }: MyVideosProps) {
  // const [searchTerm, setSearchTerm] = useState("");

  // const filteredProducts = products?.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  return (
    <div>
      <div className="w-8/12 max-xl:w-10/12 max-lg:w-full mx-auto flex justify-center mt-4 mb-6 gap-4 max-md:gap-2 px-2 max-md:px-4 items-center">
        {/* <div className="flex justify-center min-w-fit items-center font-medium gap-1 max-lg:text-sm">
          <Image width={29} height={29} src={baseIcons.sortIcon} alt="sort" />
          مرتب سازی
        </div> */}
        {/* <div className="relative w-11/12 rounded-full overflow-hidden border border-[#B5B5B5]">
          <input
            type="text"
            placeholder="جست و جو در دوره های من"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full w-full pr-3 h-10 focus:outline-none max-lg:text-sm"
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 rounded-l-full bg-[#D9D9D9] w-fit flex items-center h-full">
            <button className="cursor-pointer w-full h-full px-4 max-lg:px-3">
              <Image
                src={baseIcons.searchIcon}
                alt="search"
                className="w-7 max-lg:w-6"
              />
            </button>
          </div>
        </div> */}
      </div>
      <div className="grid gap-2 px-8 py-5 max-xl:px-4 justify-start max-md:px-4 grid-cols-[repeat(auto-fit,minmax(186px,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {products?.map((product) => (
          <div
            key={product.id}
            className="py-[6px] mx-6 flex justify-center items-start"
          >
            <ShowProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
