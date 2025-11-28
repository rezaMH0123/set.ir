import { Comment } from "@/types/product";
import { Star } from "lucide-react";

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="w-full min-h-[136px] bg-white shadow-card3 rounded-3xl py-[22px] px-[26px]">
      <div className="flex justify-between items-center ">
        <span className="font-semibold text-[18px] text-black1">
          {comment.userName?.trim() === "" ? "ناشناس" : comment.userName}
        </span>
        <span className="text-sm font-vazirFD flex gap-x-1 flex-row items-center">
          <Star className="h-3 w-3 stroke-amber-300 fill-amber-300" />
          <div className="mb-[-2px]">{comment.rate}</div>
        </span>
      </div>
      <div className="w-full mt-4 text-justify">{comment.text}</div>

      {comment.replies.map((comment, i) => (
        <div
          key={i}
          className="w-full min-h-[136px] mt-8 flex flex-row items-stretch"
        >
          <div className="w-1 bg-gray-200 rounded-full ml-3" />
          <div className="w-full min-h-[136px] bg-white shadow-card3 rounded-3xl py-[22px] px-[26px]">
            <div className="flex justify-between items-center ">
              <span className="font-semibold text-[18px] text-black1">
                {comment.userName?.trim() === "" ? "ناشناس" : comment.userName}
              </span>
            </div>
            <div className="w-full mt-4 text-justify">{comment.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentComponent;
