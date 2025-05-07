import React from "react";
import UserLayout from "@/components/templates/UserPanle/UserLayout/UserLayout";
import UserEditDetails from "@/components/templates/UserPanle/UserEditDetails/UserEditDetails";
// import { requireLogin } from "@/utils/auth/requireLogin";

function MuCourse({ user }) {
  return (
    <UserLayout userData={user}>
      <UserEditDetails userData={user} />
    </UserLayout>
  );
}

// export const getServerSideProps = requireLogin;


export default MuCourse;