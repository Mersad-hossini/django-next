import CategoryPanel from "@/components/templates/AdminPanle/CategoryPanel/CategoryPanel";
import AdminLayout from "@/components/templates/AdminPanle/AdminLayout/AdminLayout";
import React from "react";
import AuthGuard from "@/hocks/authGuard/authGuard";

function AddCategory() {
  return (
    <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
      <AdminLayout>
        <CategoryPanel />
      </AdminLayout>
    </AuthGuard>
  );
}

export default AddCategory;