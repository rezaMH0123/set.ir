"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import CommentIcon from "@/components/icons/CommentIcon";
import TextArea from "@/components/TextArea";
import RateComponent from "@/components/RateComponent";
import CommentComponent from "@/components/Comment";
import WithPagination from "@/sections/shared/WithPagination";
import { postComment, getComments } from "@/core/apiCalls/product";
import { Star } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

type Comment = {
  id: string;
  text: string;
  rate: number;
  createdAt: string;
  userName: string | null;
  userId: string;
  replies: Comment[];
};

export default function Comments({
  hasPurchased,
  commentsData,
}: {
  hasPurchased: boolean;
  commentsData?: Comment[];
}) {
  const { productId } = useParams<{ productId: string }>();
  const [meta, setMeta] = useState({ averageRating: 0, totalComments: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn } = useUser();

  const getPaginatedComments = async (
    productId: string,
    pageIndex: number,
    perPage: number
  ) => {
    const data = await getComments(
      productId,
      String(pageIndex),
      String(perPage)
    );

    return {
      items: data.comments,
      totalCount: data.totalComments,
      totalPages: Math.ceil(data.totalComments / perPage),
      averageRating: data.averageRating,
      totalComments: data.totalComments,
    };
  };

  const methods = useForm({
    defaultValues: {
      comment: "",
      rate: 0,
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = methods;

  const onSubmit = async (data: { comment: string; rate: number }) => {
    let hasError = false;
    if (!data.comment) {
      hasError = true;
    }
    if (!data.rate || data.rate < 1) {
      hasError = true;
    }
    if (hasError) {
      trigger(); // show errors
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await postComment(data.rate, data.comment, productId);
      if (res) {
        toast.success("نظر شما ثبت شد و بعد از تایید نمایش داده می‌شود");
        reset();
      }
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <aside id="comments" aria-labelledby="نظرات">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "نام محصول",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: meta.averageRating,
              reviewCount: meta.totalComments,
            },
            review: commentsData?.map((comment) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: comment.userName || "کاربر",
              },
              datePublished: comment.createdAt,
              reviewBody: comment.text,
              reviewRating: {
                "@type": "Rating",
                ratingValue: comment.rate,
                bestRating: 5,
                worstRating: 1,
              },
            })),
          }),
        }}
      />

      <div className="flex items-center gap-x-2">
        <CommentIcon className="fill-black w-6 h-6" />
        <span className="font-bold text-[16px] md:text-[20px]">نظرات</span>
      </div>
      <div className="bg-white shadow-card2 rounded-[18px] mt-6 py-8 px-7 relative">
        {!!meta?.totalComments && (
          <div className="mb-8 flex justify-center items-center gap-x-2 font-vazirFD">
            <span className="border-l-2 border-black px-2">
              {meta.totalComments} نظر
            </span>
            <div className="flex gap-x-1">
              <Star className="fill-amber-300 stroke-amber-300 w-5 h-5" />
              <span>{meta.averageRating.toFixed(1)}</span>
            </div>
          </div>
        )}
        {hasPurchased && isLoggedIn && (
          <div className="w-full  border border-LightGray rounded-2xl px-4 py-3">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-xl mx-auto"
              >
                <TextArea
                  rows={2}
                  placeholder={
                    hasPurchased && meta?.totalComments === 0
                      ? "اولین نظر را ثبت کنید"
                      : "لطفا نظر خودرا وارد کنید برای مثال : بسیار عالی بود"
                  }
                  {...register("comment", { required: "متن نظر الزامی است" })}
                />

                <div className="text-left flex justify-between items-center flex-row">
                  <div className="mt-4">
                    <Controller
                      name="rate"
                      control={methods.control}
                      rules={{
                        required: "امتیاز دادن الزامی است",
                        min: {
                          value: 1,
                          message: "امتیاز باید بین ۱ تا ۵ باشد",
                        },
                        max: {
                          value: 5,
                          message: "امتیاز باید بین ۱ تا ۵ باشد",
                        },
                      }}
                      render={({ field }) => (
                        <RateComponent
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.rate && (
                      <span className="text-red-500 text-xs block mt-1 text-right">
                        {errors.rate.message as string}
                      </span>
                    )}
                  </div>
                  <button
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                    type="submit"
                    className="mt-4 bg-blue1 font-semibold text-lg text-white p-1 px-8 rounded-2xl cursor-pointer"
                  >
                    ثبت
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        )}

        <div className="space-y-5 mt-8">
          <WithPagination<Comment>
            keyPrefix={`comments-${productId}`}
            fetcher={(pageIndex, perPage) =>
              getPaginatedComments(productId, pageIndex, perPage)
            }
            itemComponent={({ item }) => (
              <CommentComponent key={item.id} comment={item} />
            )}
            perPage={10}
            wrapperClassName="space-y-5 mt-8"
            onFirstPageLoaded={(metaData) => setMeta(metaData)}
            loadingMoreText={
              <div className="w-full place-items-center">
                <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
              </div>
            }
            notFoundComponent={
              <div className="w-full px-4 text-center place-items-center">
                هیچ نظری ثبت نشده.
                {!hasPurchased && (
                  <span className="block pt-2">
                    برای ثبت نظر لازم است که محصول را خریداری کرده باشید
                  </span>
                )}
              </div>
            }
          />
        </div>
      </div>
    </aside>
  );
}
