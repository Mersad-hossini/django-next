import React from "react";
import UserLayout from "@/components/templates/UserPanle/UserLayout/UserLayout";
import UserEditDetails from "@/components/templates/UserPanle/UserEditDetails/UserEditDetails";
import AuthGuard from "@/hocks/authGuard/authGuard";

function MuCourse({ user }) {
  return (
    <AuthGuard requireAuth={true}>
      <UserLayout userData={user}>
        <UserEditDetails userData={user} />
      </UserLayout>
    </AuthGuard>
  );
}

export default MuCourse;