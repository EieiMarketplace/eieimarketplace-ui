import { X } from "lucide-react";
import Image from "next/image";

export default function ImageCard({
  url,
  alt,
  handleDeleteImageAndFile,
}: {
  url: string;
  alt: string;
  handleDeleteImageAndFile?: (url: string) => void;
}) {
  const onDelete = () => {
    if (handleDeleteImageAndFile) {
      handleDeleteImageAndFile(url);
    }
  };
  return (
    <div className="relative flex h-full w-full">
      <Image
        className="w-full h-full object-cover object-center rounded-2xl shadow-2xl"
        src={url}
        alt={alt}
        fill
      ></Image>

      {handleDeleteImageAndFile && (
        <X
          className="absolute right-1 top-1 cursor-pointer hover:text-[#FFFFFF]"
          onClick={onDelete}
        />
      )}
    </div>
  );
}
