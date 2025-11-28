import { Star } from "lucide-react";
import { useState } from "react";

const RateComponent = ({
  value = 0,
  onChange,
  size = 24,
  className = "",
}: {
  value?: number;
  onChange?: (val: number) => void;
  size?: number;
  className?: string;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = hovered !== null ? i < hovered : i < value;

        return (
          <Star
            key={i}
            size={size}
            className={`cursor-pointer transition-all hover:scale-105 ${
              filled
                ? "fill-amber-300 stroke-amber-300"
                : "stroke-Gray-base300 fill-transparent"
            }`}
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}
    </div>
  );
};

export default RateComponent;
