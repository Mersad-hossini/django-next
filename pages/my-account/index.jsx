import React from "react";
import UserLayout from "@/components/templates/UserPanle/UserLayout/UserLayout";
import UserIndex from "@/components/templates/UserPanle/UserIndex/UserIndex";
import AuthGuard from "@/hocks/authGuard/authGuard";

function Index() {
  return (
    <AuthGuard requireAuth={true}>
      <UserLayout>
        <UserIndex />
      </UserLayout>
    </AuthGuard>
  );
}

export default Index;