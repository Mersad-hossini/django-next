import CategoryPanel from "@/components/templates/AdminPanle/CategoryPanel/CategoryPanel";
import AdminLayout from "@/components/templates/AdminPanle/AdminLayout/AdminLayout";
import React from "react";
import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";

function AddCategory() {
  return (
    <>
      <Head>
        <title>admin panel(add category)</title>
      </Head>
      <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
        <AdminLayout>
          <CategoryPanel />
        </AdminLayout>
      </AuthGuard>
    </>
  );
}

export default AddCategory;