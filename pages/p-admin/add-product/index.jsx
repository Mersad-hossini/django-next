import ProductPanel from "@/components/templates/AdminPanle/ProductPanel/ProductPanel";
import AdminLayout from "@/components/templates/AdminPanle/AdminLayout/AdminLayout";
import { requireAdmin } from "@/utils/auth/requireAdmin";
import React from "react";

function AddProdutc() {
  return (
    <AdminLayout>
      <ProductPanel />
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;

export default AddProdutc;
