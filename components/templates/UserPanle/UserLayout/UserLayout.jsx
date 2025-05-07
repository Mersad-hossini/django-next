import React, { useState } from "react";
import UserPanleNavbar from "@/components/modules/UserPanleNavbar/UserPanleNavbar";
import UserPanleSidebar from "@/components/modules/UserPanleSidebar/UserPanleSidebar";

function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="flex md:pl-67 bg-background-dark">
      <UserPanleSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <section className="w-full">
        <UserPanleNavbar setIsOpen={setIsSidebarOpen} />
        <main className="max-w-[1332px] w-full px-4 md:px-8 pb-5 md:pb-8 mx-auto">
          {children}
        </main>
      </section>
    </section>
  );
}

export default UserLayout;