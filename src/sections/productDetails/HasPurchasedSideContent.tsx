"use client";

import Accordion from "@/components/Accordion";
import HamburgerChevronIcon from "@/components/icons/HamburgerChevron";
import PlayIcon from "@/components/icons/PalyIcon";
import { useUser } from "@/context/UserContext";
import { downloadFile, downloadFilesZip } from "@/core/apiCalls/product";
import { ContentSection, FileItem, VideoItem } from "@/types/product";
import { CheckCircle, Download, File, LockKeyhole } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type HasPurchasedSideContentProps = {
  hasPurchased: boolean;
  productContent: ContentSection[];
  onVideoClick?: (videoLink: string, player: string) => void;
};

export default function HasPurchasedSideContent({
  hasPurchased,
  productContent,
  onVideoClick,
}: HasPurchasedSideContentProps) {
  const { isLoggedIn } = useUser();
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [playingVideo, setPlayingVideo] = useState<string>("");

  const params = useParams();
  const productId = params?.productId as string;

  const videosBySection: { title: string; content: VideoItem[] }[] =
    productContent.map((section) => ({
      title: section.name,
      content: section.videos ?? [],
    }));

  const notesBySection: { title: string; content: FileItem[] }[] =
    productContent.map((section) => ({
      title: section.name,
      content: section.files.filter((file) => file.type === "Textbook"),
    }));

  const summaryBySection: { title: string; content: FileItem[] }[] =
    productContent.map((section) => ({
      title: section.name,
      content: section.files.filter((file) => file.type === "SummaryNotes"),
    }));

  const solvedBySection: { title: string; content: FileItem[] }[] =
    productContent.map((section) => ({
      title: section.name,
      content: section.files.filter((file) => file.type === "SolvedQuestions"),
    }));

  const videoHasAnyContent = videosBySection.some(
    (sec) => sec.content.length > 0
  );

  const getFirstOpen = () => {
    if (videosBySection.some((s) => s.content.length > 0))
      return { type: "videos" };
    if (notesBySection.some((s) => s.content.length > 0))
      return { type: "notes" };
    if (summaryBySection.some((s) => s.content.length > 0))
      return { type: "summary" };
    if (solvedBySection.some((s) => s.content.length > 0))
      return { type: "solved" };
    return null;
  };

  const firstOpen = getFirstOpen();

  const downloadClickHandler = async (id: string) => {
    if (!downloading[id]) {
      try {
        setDownloading((prev) => ({ ...prev, [id]: true }));
        const isError = await downloadFile(id, productId);
        if (isError === "error") throw "";
        setDownloaded((prev) => ({ ...prev, [id]: true }));
      } catch {
        toast.error("مشکلی در دانلود پیش آمده. دوباره امتحان کنید");
      } finally {
        setDownloading((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const downloadAllHandler = async (files: FileItem[], key: string) => {
    if (!downloading[key]) {
      setDownloading((prev) => ({ ...prev, [key]: true }));
      toast.success("دانلود فایل شروع شد. لطفا کمی صبر کنید", {
        duration: 2000,
      });
      try {
        const isError = await downloadFilesZip(
          files.map((f) => f.id),
          productId
        );
        if (isError === "error") throw "";
        setDownloaded((prev) => ({ ...prev, [key]: true }));
      } catch {
        toast.error("مشکلی در دانلود پیش آمده. دوباره امتحان کنید");
      } finally {
        setDownloading((prev) => ({ ...prev, [key]: false }));
      }
    }
  };

  const renderFileList = (files: FileItem[]) => (
    <div className="shadow-card1 divide-y divide-LightGray">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => downloadClickHandler(file.id)}
          className="min-h-12 gap-2 px-4 flex justify-between items-center cursor-pointer py-2"
        >
          <File className="h-4 w-4" />
          <span className="text-neutral-800 flex-1 text-sm ">
            {file.fileName}
          </span>
          <div className="cursor-pointer">
            {downloading[file.id] ? (
              <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
            ) : downloaded[file.id] ? (
              <CheckCircle
                className="w-5 h-5"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <Download className="w-5 h-5" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`w-full sticky top-36 px-1 pb-1 max-h-[70vh] overflow-y-scroll
      ${hasPurchased && isLoggedIn ? "hidden md:block" : "hidden"}`}
    >
      <div>
        <div className="flex items-center gap-x-2">
          <HamburgerChevronIcon className="fill-black w-5 h-5" />
          <h2 className="font-semibold text-[16px] md:text-[20px]">
            محتوا درس
          </h2>
        </div>

        {videoHasAnyContent && (
          <>
            <h3 className="font-medium text-lg mt-8">ویدیوها</h3>
            <Accordion
              wordLimit={hasPurchased ? 5 : 15}
              items={videosBySection.filter((item) => !!item.content?.length)}
              renderContent={(videos) => (
                <ul className="divide-y divide-MediumGray">
                  {videos?.map((sub, idx) => (
                    <li
                      key={idx}
                      className={`px-2 py-2 flex justify-between items-center cursor-pointer gap-2 ${
                        sub.videoLink === playingVideo &&
                        ` bg-BrightGray transition-all duration-100`
                      }`}
                      onClick={() => {
                        if (
                          (hasPurchased || sub.isPreview) &&
                          sub.videoLink &&
                          onVideoClick
                        ) {
                          onVideoClick(sub.videoLink, sub.player);
                          setPlayingVideo(sub.videoLink);
                        }
                      }}
                    >
                      <span className="text-neutral-800 flex-1  text-sm">
                        {sub.videoName}
                      </span>
                      <div className="flex items-center gap-x-2 font-vazirFD">
                        {sub.videoTime && (
                          <span className="text-xs mt-0.5 text-neutral-800 truncate ">
                            {sub.videoTime}
                          </span>
                        )}
                        {hasPurchased || sub.isPreview ? (
                          <PlayIcon className="stroke-neutral-800 h-4 w-4" />
                        ) : (
                          <LockKeyhole className="stroke-neutral-800 h-4 w-4" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              defaultOpenIndices={firstOpen?.type === "videos" ? [0] : []}
            />
          </>
        )}

        {[
          {
            title: "کتاب درسی",
            sections: notesBySection,
            type: "notes",
            key: "notes",
          },
          {
            title: "خلاصه نکات",
            sections: summaryBySection,
            type: "summary",
            key: "summary",
          },
          {
            title: "نمونه سوال",
            sections: solvedBySection,
            type: "solved",
            key: "solved",
          },
        ].map(({ title, sections, key, type }) =>
          sections.some((sec) => sec.content.length > 0) ? (
            <div key={key}>
              <h3 className="font-medium text-lg mt-8 mb-4">{title}</h3>

              {sections.some((sec) => sec.content.length > 0) && (
                <div className="flex justify-end">
                  <span
                    onClick={() =>
                      downloadAllHandler(
                        sections.flatMap((sec) => sec.content),
                        key
                      )
                    }
                    className="text-blue1 underline mb-2 cursor-pointer flex flex-row items-center gap-1"
                  >
                    دانلود همه
                    {downloading[key] && (
                      <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                    )}
                    {downloaded[key] && <CheckCircle className="w-5 h-5" />}
                  </span>
                </div>
              )}
              <Accordion<FileItem[]>
                wordLimit={5}
                items={sections
                  .filter((sec) => sec.content.length > 0)
                  .map((sec) => ({
                    title: sec.title,
                    content: sec.content,
                  }))}
                renderContent={(files) => renderFileList(files)}
                defaultOpenIndices={firstOpen?.type === type ? [0] : []}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
