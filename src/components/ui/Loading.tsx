import { cn } from "@/lib/utils";
import loadingSvg from "public/loading-indicator.svg";
import Image from "next/image";

type Props = {
  size?: "LG" | "SM";
};

export default function Loading({ size = "LG" }: Props) {
  return (
    <div className="flex flex-1 justify-center items-center">
      <Image
        priority
        src={loadingSvg}
        alt="loading"
        className={cn(size === "LG" ? "w-16 h-16" : "w-9 h-9")}
      />
    </div>
  );
}
