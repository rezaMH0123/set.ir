"use client";

import React, { useMemo } from "react";
import MemorizedPlayer from "./MemorizedPlayer";

const VideoPlayerWithSkeleton = ({ src }: { src: string; player: string }) => {
  const embedUrl = useMemo(() => {
    if (!src) return undefined;
    return src;
  }, [src]);

  return (
    <div className="relative w-full md:rounded-2xl overflow-hidden pb-[56.25%]">
      {embedUrl ? (
        <MemorizedPlayer embedUrl={embedUrl ?? null} />
      ) : (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayerWithSkeleton;
