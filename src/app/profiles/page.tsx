import { auth } from "@/auth";
import LoadingItem from "@/components/LoadingItem";
import Profiles from "@/components/profiles/Profiles";
import { getUserProfiles } from "@/data/user";
import { Suspense } from "react";

const ProfilesPage = async () => {
  const session = await auth();
  const profiles = getUserProfiles(session?.user?.id);
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen md:flex-row">
      <Suspense fallback={<LoadingItem />}>
        <Profiles profilesPromise={profiles} />
      </Suspense>
    </div>
  );
};

export default ProfilesPage;
