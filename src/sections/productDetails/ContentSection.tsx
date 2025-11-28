"use client";

import Accordion from "@/components/Accordion";
import ToggleBox from "@/components/ToggleButtonGroup";
import HamburgerChevronIcon from "@/components/icons/HamburgerChevron";
import PlayIcon from "@/components/icons/PalyIcon";
import { Download, LockKeyhole, CheckCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import useIsMobile from "@/utils/hooks/useIsMobile";
import { useState } from "react";
import { Product, VideoItem, FileItem } from "@/types/product";
import { downloadFile } from "@/core/apiCalls/product";
import AuthStepController from "@/components/auth/AuthStepController";

type ContentSectionProps = {
  hasPurchased: boolean;
  product: Product;
  onVideoClick?: (videoLink: string, player: string) => void;
};

type SectionWithContent<T> = {
  title: string;
  content: T[];
};

export default function ContentSection({
  hasPurchased,
  product,
  onVideoClick,
}: ContentSectionProps) {
  const { isLoggedIn } = useUser();
  const { isMobile } = useIsMobile();

  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [playingVideo, setPlayingVideo] = useState("");

  const hideOnMd = hasPurchased && isLoggedIn;

  const videos: SectionWithContent<VideoItem>[] = product.contents.map(
    (section) => ({ title: section.name, content: section.videos })
  );

  const notesBySection: SectionWithContent<FileItem>[] = product.contents.map(
    (section) => ({
      title: section.name,
      content: section.files.filter((file) => file.type === "Textbook"),
    })
  );

  const solvedQuestionsBySection: SectionWithContent<FileItem>[] =
    product.contents.map((section) => ({
      title: section.name,
      content: section.files.filter((file) => file.type === "SolvedQuestions"),
    }));

  const summaryOfPointsBySection: SectionWithContent<FileItem>[] =
    product.contents.map((section) => ({
      title: section.name,
      content: section.files.filter((file) => file.type === "SummaryNotes"),
    }));

  const filterEmptySections = <T,>(sections: SectionWithContent<T>[]) =>
    sections.filter((sec) => sec.content.length > 0);

  const videoHasContent = videos.some((v) => v.content.length > 0);

  const rawOptions: (false | { label: string; value: string })[] = [
    videoHasContent && { label: "ویدیو", value: "videos" },
    notesBySection.some((sec) => sec.content.length > 0) && {
      label: "کتاب درسی",
      value: "notesBySection",
    },
    solvedQuestionsBySection.some((sec) => sec.content.length > 0) && {
      label: "نمونه سوال",
      value: "questions",
    },
    summaryOfPointsBySection.some((sec) => sec.content.length > 0) && {
      label: "خلاصه نکات",
      value: "SummaryOfPoints",
    },
  ];

  const options = rawOptions.filter(
    (opt): opt is { label: string; value: string } => Boolean(opt)
  );

  const currentType = options[0]?.value;
  const [selectedType, setSelectedType] = useState(currentType);

  if (hideOnMd && !isMobile) return null;

  const handleTypeChange = (value: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("type", value);
    window.history.pushState({}, "", newUrl.toString());
    setSelectedType(value);
  };

  const getFirstNonEmptyIndex = <T,>(sections: SectionWithContent<T>[]) => {
    const idx = sections.findIndex((sec) => sec.content.length > 0);
    return idx === -1 ? undefined : idx;
  };

  const downloadFileHandler = async (file: FileItem) => {
    if (!file.id) return;
    const id = file.id;
    if (downloading[id]) return;

    try {
      setDownloading((prev) => ({ ...prev, [id]: true }));
      await downloadFile(id, product.id);
      setDownloaded((prev) => ({ ...prev, [id]: true }));
    } catch (err) {
      console.error(err);
      alert("مشکلی در دانلود پیش آمده. دوباره امتحان کنید");
    } finally {
      setDownloading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const renderFileList = (files: FileItem[]) => (
    <div className="shadow-card1 divide-y divide-LightGray">
      {files.map((file, idx) => {
        const isDownloaded = downloaded[file.id];

        const handleClick = () => {
          if (file.isPreview && !isLoggedIn) {
            const event = new CustomEvent("openModal", {
              detail: { modalId: "auth" },
            });
            window.dispatchEvent(event);
            return;
          }

          if (
            (hasPurchased || (file.isPreview && isLoggedIn)) &&
            !isDownloaded
          ) {
            downloadFileHandler(file);
          }
        };
        return !isLoggedIn && file.isPreview ? (
          <AuthStepController
            id={String(idx)}
            triggerButton={
              <div
                key={file.id}
                className="h-12 gap-2 px-4 flex justify-between items-center cursor-pointer"
                onClick={handleClick}
              >
                <span className="truncate w-full">{file.fileName}</span>
                <div className="flex items-center gap-2">
                  {downloading[file.id] ? (
                    <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full" />
                  ) : downloaded[file.id] ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : hasPurchased || file.isPreview ? (
                    <Download className="w-5 h-5" />
                  ) : (
                    <LockKeyhole className="w-5 h-5" />
                  )}
                </div>
              </div>
            }
          />
        ) : (
          <div
            key={file.id}
            className="h-12 gap-2 px-4 flex justify-between items-center cursor-pointer"
            onClick={handleClick}
          >
            <span className="truncate w-full">{file.fileName}</span>
            <div className="flex items-center gap-2">
              {downloading[file.id] ? (
                <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full" />
              ) : downloaded[file.id] ? (
                <CheckCircle className="w-5 h-5" />
              ) : hasPurchased || file.isPreview ? (
                <Download className="w-5 h-5" />
              ) : (
                <LockKeyhole className="w-5 h-5" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderContent = () => {
    switch (selectedType) {
      case "videos":
        const videoSections = filterEmptySections(videos);

        return (
          <Accordion
            items={filterEmptySections(videos)}
            withCloseAll
            defaultOpenIndices={[getFirstNonEmptyIndex(videoSections) ?? 0]}
            renderContent={(videos) => (
              <ul className="divide-y divide-MediumGray">
                {videos.map((sub, idx) => {
                  const canClick = hasPurchased || sub.isPreview;
                  return (
                    <li
                      key={idx}
                      className={`px-4 py-2 flex justify-between items-center ${
                        canClick
                          ? "cursor-pointer"
                          : "cursor-default text-gray-400"
                      } ${
                        sub.videoLink === playingVideo &&
                        ` bg-BrightGray transition-all duration-100`
                      }`}
                      onClick={() => {
                        if (canClick && sub.videoLink && onVideoClick) {
                          onVideoClick(sub.videoLink, sub.player);
                          setPlayingVideo(sub.videoLink);
                        }
                      }}
                    >
                      <span className="text-neutral-800 flex-1 text-sm">
                        {sub.videoName}
                      </span>
                      <div className="flex items-center gap-x-2 font-vazirFD">
                        {sub.videoTime && (
                          <span className="text-xs mt-0.5 text-neutral-800 w-10">
                            {sub.videoTime}
                          </span>
                        )}
                        {canClick ? (
                          <PlayIcon className="stroke-neutral-800 h-4 w-4" />
                        ) : (
                          <LockKeyhole className="stroke-neutral-800 h-4 w-4" />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          />
        );

      case "notesBySection":
        const notesSections = filterEmptySections(notesBySection);
        return (
          <Accordion
            items={filterEmptySections(notesBySection)}
            withCloseAll
            defaultOpenIndices={[getFirstNonEmptyIndex(notesSections) ?? 0]}
            renderContent={(files) => renderFileList(files)}
          />
        );

      case "questions":
        const questionSections = filterEmptySections(solvedQuestionsBySection);
        return (
          <Accordion
            items={filterEmptySections(solvedQuestionsBySection)}
            withCloseAll
            defaultOpenIndices={[getFirstNonEmptyIndex(questionSections) ?? 0]}
            renderContent={(files) => renderFileList(files)}
          />
        );

      case "SummaryOfPoints":
        const summarySections = filterEmptySections(summaryOfPointsBySection);
        return (
          <Accordion
            items={filterEmptySections(summaryOfPointsBySection)}
            withCloseAll
            defaultOpenIndices={[getFirstNonEmptyIndex(summarySections) ?? 0]}
            renderContent={(files) => renderFileList(files)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      id="content"
      data-section
      data-label="محتواها"
      dir="rtl"
      className={`mt-16 ${hideOnMd ? "md:hidden" : ""}`}
    >
      <div className="flex items-center gap-x-2 mb-4">
        <HamburgerChevronIcon className="fill-black w-6 h-6" />
        <span className="font-bold text-[16px] md:text-[20px]">محتوا ها</span>
      </div>

      {options.length > 0 && (
        <ToggleBox
          className="mb-5"
          currentType={selectedType}
          options={options}
          handleClick={handleTypeChange}
        />
      )}

      <div className="px-1">{renderContent()}</div>
    </div>
  );
}
