import AdminLayout from "@/components/templates/AdminPanle/AdminLayout/AdminLayout";
import UserTable from "@/components/templates/AdminPanle/UserTable/UserTable";
import { requireAdmin } from "@/utils/auth/requireAdmin";
import React from "react";

function AllUsers() {
  return (
    <AdminLayout>
      <UserTable />
    </AdminLayout>
  );
}

export const getServerSideProps = requireAdmin;

export default AllUsers;
