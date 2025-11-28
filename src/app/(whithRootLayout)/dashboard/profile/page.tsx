"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { useGrades, useMajors } from "@/core/swrHooks/dashboard";
import { SelectOptionsType } from "@/types/dashboard.type";
import { updateUserProfile } from "@/core/apiCalls/dashboard";
import { useUser } from "@/context/UserContext";
import { mutate } from "swr";
import SWR_KEYS from "@/core/swrKeys";
import toast from "react-hot-toast";

const profileSchema = z.object({
  //phoneNumber: z
  //.string()
  //.nonempty("لطفاً شماره موبایل خود را وارد کنید")
  //.regex(mobileRegExp, "شماره موبایل وارد شده معتبر نیست"),
  firstName: z.string().nonempty("لطفاً نام خود را وارد کنید"),
  lastName: z.string().nonempty("لطفاً نام خانوادگی خود را وارد کنید"),
  gender: z.string().nonempty("لطفاً جنسیت خود را انتخاب کنید"),
  grade: z.string().nonempty("لطفاً پایه تحصیلی خود را انتخاب کنید"),
  major: z.string().optional(),
});

type FormData = z.infer<typeof profileSchema>;
export default function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      //phoneNumber: "",
      firstName: "",
      lastName: "",
      gender: "",
      grade: "",
      major: "",
    },
  });
  const [showMajor, setShowMajor] = useState(false);
  const { grades } = useGrades();
  const { majors } = useMajors();
  const { user: profile } = useUser();
  useEffect(() => {
    if (!profile || grades.length === 0 || majors.length === 0) return;

    const gradeValue = grades.find(
      (opt: SelectOptionsType) => opt.name === profile.grade?.name
    )?.id;
    const majorValue = majors.find(
      (opt: SelectOptionsType) => opt.name === profile.major?.name
    )?.id;

    reset({
      //phoneNumber: profile.phoneNumber ?? "",
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      gender: profile.gender !== "None" ? profile.gender : "",
      grade: String(gradeValue ?? ""),
      major: String(majorValue ?? ""),
    });
  }, [grades, majors, profile, reset]);

  useEffect(() => {
    const selectedGradeId = watch("grade");
    const selectedGradeName = grades.find(
      (opt: SelectOptionsType) => String(opt.id) === String(selectedGradeId)
    )?.name;
    setShowMajor(selectedGradeName?.includes("دهم") ?? false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("grade")]);

  const onSubmit = async (data: FormData) => {
    const selectedGradeName = grades.find(
      (opt: SelectOptionsType) => String(opt.id) === String(data.grade)
    )?.name;
    setShowMajor(selectedGradeName?.includes("دهم") ?? false);
    const showMajor = selectedGradeName?.includes("دهم");
    if (showMajor && !data.major) {
      setError("major", {
        type: "manual",
        message: "لطفاً رشته تحصیلی خود را انتخاب کنید",
      });
      return;
    }

    const payload: {
      gradeId: string;
      majorId: string | undefined;
      firstName: string;
      lastName: string;
      gender: string;
      grade?: string;
      major?: string | undefined;
    } = {
      ...data,
      gradeId: data.grade,
      majorId: data.major,
    };

    delete payload.grade;
    delete payload.major;

    if (!showMajor) {
      delete payload.majorId;
    }
    try {
      await updateUserProfile(payload);
      reset(data);
      mutate(SWR_KEYS.userProfile);
      toast.success("پروفایل شما با موفقیت ویرایش شد.");
    } catch {}
  };

  return (
    <div>
      <form
        dir="rtl"
        className="mt-10 max-md:mt-0 mx-auto text-[#262626] py-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-16 items-start max-xl:px-8 max-lg:px-4 max-sm:px-6 grid grid-cols-2 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-16 max-xl:gap-x-8">
          <InputField
            id="phoneNumber"
            label="شماره موبایل"
            placeholder={profile?.phoneNumber + " (غیر قابل تغییر)"}
            //register={register("phoneNumber")}
            //error={errors.phoneNumber}
            disabled
          />

          <InputField
            id="firstName"
            label="نام"
            placeholder="نام"
            register={register("firstName")}
            error={errors.firstName}
          />

          <InputField
            id="lastName"
            label="نام خانوادگی"
            placeholder="نام خانوادگی"
            register={register("lastName")}
            error={errors.lastName}
          />

          <SelectField
            id="gender"
            label="جنسیت"
            register={register("gender")}
            error={errors.gender}
            options={[
              { id: "Male", name: "مرد" },
              { id: "Female", name: "زن" },
            ]}
          />

          <SelectField
            id="grade"
            label="پایه تحصیلی"
            register={register("grade")}
            error={errors.grade}
            options={grades}
          />

          {showMajor && (
            <SelectField
              id="major"
              label="رشته تحصیلی"
              register={register("major")}
              error={errors.major}
              options={majors}
            />
          )}
        </div>
        <div className="w-fit max-sm:w-full mt-10 py-5 flex flex-col items-center bg-white mx-auto">
          <button
            type="submit"
            disabled={!isDirty}
            className={`bg-[#224CDF] w-40 max-sm:w-11/12 text-white font-semibold text-xl rounded-[12px] py-3  ${
              !isDirty ? "opacity-50 cursor-default" : "cursor-pointer"
            }`}
          >
            اعمال تغییرات
          </button>
        </div>
      </form>
    </div>
  );
}
