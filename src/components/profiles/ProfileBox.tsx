import { UserProfile } from "@prisma/client";

interface ProfileBoxProps {
  profile: UserProfile;
  onClick: (prfileId: string) => void;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ profile, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 hover:opacity-80 cursor-pointer p-4 rounded-lg bg-black hover:scale-110 transition-all"
      onClick={() => onClick(profile.id)}
    >
      <div
        className="w-[100px] h-[100px]"
        style={{ backgroundColor: profile.color || "white" }}
      ></div>
      <p className="text-white text-sm">{profile.name}</p>
    </div>
  );
};

export default ProfileBox;
