import { FaUserCircle } from "react-icons/fa";
interface ProfileImageProps {
  imageUrl?: string;
  alt?: string;
  size?: number;
}

export default function ProfileImage({
  imageUrl,
  alt = "profile",
  size,
}: ProfileImageProps) {
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <FaUserCircle
          size={size}
          className="w-full h-full fill-[#2F6BEB] dark:fill-[#FFFFFF]"
        />
      )}
    </div>
  );
}
