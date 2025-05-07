import React, { useEffect } from "react";
import UserLayout from "@/components/templates/UserPanle/UserLayout/UserLayout";
import UserIndex from "@/components/templates/UserPanle/UserIndex/UserIndex";
// import { requireLogin } from "@/utils/auth/requireLogin";

function Index() {
  return (
    <UserLayout>
      <UserIndex />
    </UserLayout>
  );
}

// export const getServerSideProps = requireLogin;
export const getServerSideProps = (context) => {
  console.log(context);
  return {
    props: {}
  }
}

export default Index;