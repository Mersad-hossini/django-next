import AdminLayout from "@/components/templates/AdminPanle/AdminLayout/AdminLayout";
import Index from "@/components/templates/AdminPanle/Index/Index";
import AuthGuard from "@/hocks/authGuard/authGuard";
import React from "react";

function index() {
  return (
    <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
      <AdminLayout>
        <Index />
      </AdminLayout>
    </AuthGuard>
  );
}

export default index;