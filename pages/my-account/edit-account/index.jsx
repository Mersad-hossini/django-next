import React from "react";
import UserLayout from "@/components/templates/UserPanle/UserLayout/UserLayout";
import UserEditDetails from "@/components/templates/UserPanle/UserEditDetails/UserEditDetails";
import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";

function MuCourse({ user }) {
  return (
    <>
      <Head>
        <title>edit account</title>
      </Head>
      <AuthGuard requireAuth={true}>
        <UserLayout userData={user}>
          <UserEditDetails userData={user} />
        </UserLayout>
      </AuthGuard>
    </>
  );
}

export default MuCourse;