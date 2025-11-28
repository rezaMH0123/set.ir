"use client";

import { downloadFile, downloadFilesZip } from "@/core/apiCalls/product";
import { CheckCircle, Download, File, Lock } from "lucide-react";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

type File = {
  fileName: string;
  filePages: number;
  filePath: string | null;
  id: string;
  isPreview: boolean;
  sortOrder: number;
  type: string;
};

type ContentToggleProps = {
  data: File[];
  hasPurchased: boolean;
  downloading: Record<string, boolean>;
  setDownloading: Dispatch<SetStateAction<Record<string, boolean>>>;
  downloaded: Record<string, boolean>;
  setDownloaded: Dispatch<SetStateAction<Record<string, boolean>>>;
  id: string;
};

export default function ContentToggle({
  data,
  hasPurchased,
  downloaded,
  downloading,
  setDownloaded,
  setDownloading,
  id,
}: ContentToggleProps) {
  const params = useParams();
  const productId = params?.productId as string;

  const downloadClickHandler = async (id: string) => {
    setDownloading((pre) => {
      return { ...pre, [id]: true };
    });
    try {
      const isError = await downloadFile(id, productId);
      if (isError === "error") throw "";
      setDownloading((pre) => {
        return { ...pre, [id]: false };
      });
      setDownloaded((pre) => {
        return { ...pre, [id]: true };
      });
    } catch {
      toast.error("مشکلی در دانلود پیش آمده. دوباره امتحان کنید");
      setDownloading((pre) => {
        return { ...pre, [id]: false };
      });
    }
  };

  return (
    <div className="mt-4">
      {data?.length > 1 &&
        //check if all files has preview mode or user purchased the content
        (data.reduce((acc, file) => acc && file.isPreview, true) ||
          hasPurchased) && (
          <div className="flex justify-end">
            <span
              onClick={async () => {
                if (!downloading[id]) {
                  setDownloading((pre) => {
                    return { ...pre, [id]: true };
                  });
                  toast.success("دانلود فایل شروع شد. لطفا کمی صبر کنید", {
                    duration: 2000,
                  });
                  try {
                    const isError = await downloadFilesZip(
                      data.map((item) => item.id),
                      productId
                    );
                    if (isError === "error") throw "";
                    setDownloading((pre) => {
                      return { ...pre, [id]: false };
                    });
                    setDownloaded((pre) => {
                      return { ...pre, [id]: true };
                    });
                  } catch {
                    toast.error("مشکلی در دانلود پیش آمده. دوباره امتحان کنید");
                    setDownloaded((pre) => {
                      return { ...pre, [id]: false };
                    });
                  }
                }
              }}
              className="text-blue1 underline mb-2 cursor-pointer flex flex-row items-center gap-1"
            >
              دانلود همه
              {downloading[id] && (
                <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
              )}
              {downloaded[id] && <CheckCircle className="w-5 h-5" />}
            </span>
          </div>
        )}
      <div className="shadow-card1  divide-y divide-LightGray">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              (item.isPreview || hasPurchased) && downloadClickHandler(item.id)
            }
            className="h-12 gap-2 px-4 w-full flex justify-between items-center cursor-pointer"
          >
            <File className="h-4 w-4" />
            <div className="flex-1 truncate">{item.fileName}</div>
            {!item.isPreview && !hasPurchased && <Lock className="w-4 h-4" />}
            {(item.isPreview || hasPurchased) &&
              item.id &&
              (downloading[item.id] ? (
                <div className="animate-spin w-5 h-5 block border-2 border-gray-400 border-t-transparent rounded-full"></div>
              ) : downloaded[item.id] ? (
                <CheckCircle className="w-5 h-5 " />
              ) : (
                <Download className="w-5 h-5" />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
