import AdminPanleNavbar from "@/components/modules/AdminPanleNavbar/AdminPanleNavbar";
import AdminPanleSidebar from "@/components/modules/AdminPanleSidebar/AdminPanleSidebar";
import React, { useState } from "react";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="flex md:pl-67 bg-background-dark">
      <AdminPanleSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <section className="w-full">
        <AdminPanleNavbar setIsOpen={setIsSidebarOpen} />
      <main>{children}</main>
      </section>
    </section>
  );
}

export default AdminLayout;