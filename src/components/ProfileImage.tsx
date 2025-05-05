import ProfileIcon from "../icons/ProfileIcon";

interface ProfileImageProps {
  size?: number;
  imageUrl?: string;
  alt?: string;
}

export default function ProfileImage({
  size = 80,
  imageUrl,
  alt = "profile",
}: ProfileImageProps) {
  return (
    <div
      className="rounded-full bg-[#2F6BEB] flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          className="object-contain w-full h-full"
        />
      ) : (
        <ProfileIcon size={size * 0.5} color="white" />
      )}
    </div>
  );
}
