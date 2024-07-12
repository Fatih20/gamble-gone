import ProfileForm from "./profile-form";
import ReviewForm from "./review-form";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import { H1 } from "@/components/ui/typography";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";
import { getUserProfile } from "@/lib/queries/profile";
import { getUserReview } from "@/lib/queries/review";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | GambleGone",
  openGraph: {
    ...openGraphTemplate,
    title: "Profile | GambleGone",
  },
  twitter: {
    ...twitterTemplate,
    title: "Profile | GambleGone",
  },
};

const ProfilePage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/login");
  }
  let isEditing = false;
  let prevReview = null;

  const res = await getUserReview();
  const User = await getUserProfile(session.id);

  if (!User) {
    redirect("/auth/login");
  }

  if (res) {
    isEditing = true;
    prevReview = res;
  }

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-start justify-center p-24 gap-3">
      <H1 className="mb-5 font-extrabold text-black" level={"5xl"}>
        Profile
      </H1>
      <ProfileForm User={User} />
      <ReviewForm isEditing={isEditing} prevReview={prevReview} />
    </main>
  );
};

export default ProfilePage;
