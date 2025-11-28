import TeacherIcon from "@/components/icons/TeacherIcon";
import Image from "next/image";
import React from "react";
import BooksIcon from "@/components/icons/‌Books";
import LibraryIcon from "@/components/icons/Library";
import { BASE_IMAGE_URL } from "@/configs/globals";

type TeachersSectionProps = {
  data: {
    name: string;
    education: string;
    subjects: string;
    profilePictureUrl: string;
  }[];
};

export default function TeachersSection({ data }: TeachersSectionProps) {
  return (
    <section aria-label="مدرس‌ها">
      <div className="flex items-center gap-x-2">
        <TeacherIcon className="fill-black w-6 h-6" aria-hidden="true" />
        <h2 className="font-bold text-[16px] md:text-[20px]">مدرس‌ها</h2>
      </div>

      <div className="flex h-[144px] mt-9 overflow-x-hidden">
        <ul className="flex gap-x-5 px-0.5 w-max h-full overflow-x-auto overflow-y-hidden">
          {data?.map((teacher, i) => (
            <li
              key={i}
              className="flex flex-row items-center p-4 h-[136px] bg-white shadow-card2 rounded-2xl"
            >
              <div className="w-[85px] h-[85px] md:w-[104px] md:h-[104px] border border-gray-200 rounded-[18px] overflow-hidden">
                <Image
                  src={BASE_IMAGE_URL + teacher.profilePictureUrl}
                  alt={`پروفایل ${teacher.name}، معلم دروس ${teacher.subjects}`}
                  title={`تصویر پروفایل ${teacher.name}، معلم خوش‌ذوق`}
                  width={256}
                  height={256}
                  className="h-full aspect-square"
                />
              </div>

              <div className="mr-5 md:mr-8 h-[85px] md:h-[104px] flex flex-col gap-2 justify-evenly w-[200px] md:w-[320px]">
                <h3 className="text-sm md:text-[18px] font-semibold">
                  {teacher.name} - معلم {teacher.subjects}
                </h3>

                <p className="flex items-start text-[12px] md:text-sm text-wrap overflow-hidden">
                  <BooksIcon
                    className="ml-2 fill-black2 min-w-4 min-h-4"
                    aria-hidden="true"
                  />
                  دروس: {teacher.subjects}
                </p>

                <p className="flex items-start text-[12px] md:text-sm text-wrap overflow-hidden">
                  <LibraryIcon
                    className="ml-2 fill-black2 min-w-4 min-h-4"
                    aria-hidden="true"
                  />
                  تحصیلات: {teacher.education}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
