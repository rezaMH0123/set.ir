import { useFavorites } from "@/context/FavoritesContext";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";

const LikeComponent = ({
  pid,
  className = "",
}: {
  pid: string;
  className?: string;
}) => {
  const { dislike, like, favoritesSet } = useFavorites();

  const handleClick = () => {
    // Optional: اگر لازم بود با stopPropagation کنترل بیشتری داشته باشی
    if (favoritesSet[pid]) dislike(pid);
    else like(pid);
  };

  return (
    <>
      {favoritesSet[pid] ? (
        <HeartSolidIcon
          onClick={handleClick}
          className={`fill-red-600 cursor-pointer   ${className}`}
        />
      ) : (
        <HeartOutlineIcon
          onClick={handleClick}
          className={`fill-MediumGray cursor-pointer ${className}`}
        />
      )}
    </>
  );
};

export default LikeComponent;
