import AdminLayout from "@/components/templates/AdminPanle/AdminLayout/AdminLayout";
import UserTable from "@/components/templates/AdminPanle/UserTable/UserTable";
import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";
import React from "react";

function AllUsers() {
  return (
    <>
      <Head>
        <title>admin panel(all users)</title>
      </Head>
      <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
        <AdminLayout>
          <UserTable />
        </AdminLayout>
      </AuthGuard>
    </>
  );
}

export default AllUsers;