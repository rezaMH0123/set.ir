"use client";
import BACKEND_ROUTES from "@/core/configs";
import httpService from "@/core/services/http-services";
import { ChangeEvent, FormEventHandler, useState } from "react";
import toast from "react-hot-toast";

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Subject: "",
    Text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await httpService.post(BACKEND_ROUTES.POST_COOPERATION, formData);
      toast.success("با تشکر. درخواست شما برای همکاری ارسال شد");
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="w-9/12 max-lg:w-11/12 max-sm:w-full mx-auto p-6 bg-white rounded-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-2 font-medium">
            نام
          </label>
          <input
            id="firstName"
            name="FirstName"
            type="text"
            placeholder="مثال: علی"
            value={formData.FirstName}
            onChange={handleChange}
            className="p-3 rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-none text-right"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-2 font-medium">
            نام خانوادگی
          </label>
          <input
            id="lastName"
            name="LastName"
            type="text"
            placeholder="مثال: محمدی"
            value={formData.LastName}
            onChange={handleChange}
            className="p-3 rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-none text-right"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 font-medium">
            شماره تماس
          </label>
          <input
            id="phone"
            name="PhoneNumber"
            type="tel"
            placeholder="0912xxxxxxx"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className="p-3 rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-none text-right"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">
            ایمیل
          </label>
          <input
            id="email"
            name="Email"
            type="email"
            placeholder="example@domain.com"
            value={formData.Email}
            onChange={handleChange}
            className="p-3 rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-none text-right"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="subject" className="mb-2 font-medium">
            عنوان درخواست
          </label>
          <input
            id="subject"
            name="Subject"
            type="text"
            placeholder="موضوع درخواست"
            value={formData.Subject}
            onChange={handleChange}
            className="p-3 rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-none text-right"
            required
          />
        </div>

        <div className=" flex flex-col ">
          <label htmlFor="message" className="mb-2 font-medium">
            متن پیام
          </label>
          <textarea
            id="message"
            name="Text"
            rows={5}
            placeholder="متن خود را بنویسید..."
            value={formData.Text}
            onChange={handleChange}
            className="p-3 rounded-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] focus:outline-none text-right"
            required
          />
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ارسال درخواست
        </button>
      </div>
    </form>
  );
}
