import ProductPanel from "@/components/templates/AdminPanle/ProductPanel/ProductPanel";
import AdminLayout from "@/components/templates/AdminPanle/AdminLayout/AdminLayout";
import React from "react";
import AuthGuard from "@/hocks/authGuard/authGuard";

function AddProdutc() {
  return (
    <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
      <AdminLayout>
        <ProductPanel />
      </AdminLayout>
    </AuthGuard>
  );
}

export default AddProdutc;