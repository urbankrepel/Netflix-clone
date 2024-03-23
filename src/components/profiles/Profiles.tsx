"use client";

import React from "react";
import ProfileBox from "./ProfileBox";
import { UserProfile } from "@prisma/client";

interface ProfileProps {
  profilesPromise: Promise<UserProfile[] | null>;
}

const Profiles: React.FC<ProfileProps> = async ({ profilesPromise }) => {
  const profiles = await profilesPromise;

  const createProfile = () => {};

  const chooseProfile = (profileId: string) => {
    console.log(profileId);
  };

  return (
    <>
      {profiles?.map((profile) => (
        <ProfileBox
          profile={profile}
          onClick={chooseProfile}
          key={profile.id}
        />
      ))}
      <ProfileBox
        profile={{
          id: "0",
          userId: "0",
          name: "Create Profile",
          color: "white",
        }}
        onClick={createProfile}
        key="0"
      />
    </>
  );
};

export default Profiles;
