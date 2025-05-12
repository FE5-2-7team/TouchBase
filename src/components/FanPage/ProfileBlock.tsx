import ProfileImage from "./ProfileImage";

interface ProfileBlockProps {
  username?: string;
  size?: number;
}

// 프로필 이미지 + 이름 기본 프레임
export default function ProfileBlock({ username }: ProfileBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center w-[100px]">
      <ProfileImage />
      <p className="mt-2 text-center font-bold text-[16px]">{username}</p>
    </div>
  );
}
