import { useCallback, useEffect, useState } from "react";

const MemorizedPlayer = ({ embedUrl }: { embedUrl: string }) => {
  const [loading, setLoading] = useState(true);
  const [stableUrl, setStableUrl] = useState("");

  //to prevent iframe from rerender (link doesnt change, but we have rerender and iframe resets loading url)
  useEffect(() => {
    if (!!embedUrl && embedUrl !== stableUrl) setStableUrl(embedUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [embedUrl]);

  const RetuenEl = useCallback(
    () =>
      !!stableUrl && (
        <iframe
          title="setplayer"
          src={stableUrl}
          onLoad={() => setLoading(false)}
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      ),
    [stableUrl]
  );

  return (
    <>
      <RetuenEl />
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
};
export default MemorizedPlayer;
