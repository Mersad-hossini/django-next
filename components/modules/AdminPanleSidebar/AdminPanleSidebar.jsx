import logoutUser from "@/utils/auth/logout";
import {
  GlobeAsiaAustraliaIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  XMarkIcon,
  PlusCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";

function AdminPanleSidebar({ isOpen, setIsOpen }) {
  const { user } = useUser();

  const closeSidebarHandler = () => {
    setIsOpen(false);
  };

  const router = useRouter();

  return (
    <aside
      className={`navigation fixed md:left-0 bottom-0 top-0 w-67 flex flex-col shrink-0 bg-white dark:bg-darker py-4.5 px-6 z-50 md:z-auto overflow-y-auto transition-all ${
        isOpen ? "left-0" : "-left-67"
      }`}
    >
      {/* Moblie links  */}
      <div className="flex md:hidden items-center justify-between mb-8 relative">
        <div className="flex gap-x-3">
          <div className="switch-theme btn only-icon bg-gray-100 text-slate-500 dark:bg-white/5 dark:text-white"></div>
          <div className="size-13 flex-center rounded-full bg-light-gray text-slate-500 cursor-pointer close-sidebar">
            <XMarkIcon
              className="size-5.5 sm:size-6 text-white"
              onClick={closeSidebarHandler}
            />
          </div>
        </div>
      </div>

      {/* Top User Info  */}
      <div className="relative bg-green-500 text-white rounded md:h-[140px] px-3 py-3 md:pt-5 mb-8 md:mb-20 text-center">
        <span className="block font-danaDemiBold truncate">
          {user?.username}
        </span>
        <span className=" text-red-400 font-bold mt-2.5">
          {user?.role === "admin" ? "Admin" : "-"}{" "}
        </span>
        <div className="hidden md:block relative -mb-11 mx-auto mt-3.5 size-22 p-1 bg-gradient-to-b from-white/40 to-white/0 to-100% shadow-md rounded-full">
          <img
            src="/images/user-image.png"
            className="size-full object-cover rounded-full"
            alt="namiko"
          />
          <div className="absolute left-1 bottom-1 flex items-center justify-center size-6 bg-sky-500 border-2 border-white rounded-full">
            <GlobeAsiaAustraliaIcon className="size-5" />
          </div>
        </div>
      </div>

      {/* Main Content (wrapped in a grow container)  */}
      <div className="flex-grow">
        <div className="divide-y divide-neutral-200/50 dark:divide-white/10 child:relative first-child:pt-0 last-child:pb-0 mb-10">
          <div className="py-2 md:py-3">
            <Link
              href="/p-admin"
              className={`flex items-center justify-between text-sm md:text-base font-danaMedium ${
                router.pathname === "/p-admin"
                  ? "**:text-sky-500"
                  : "text-white"
              }`}
            >
              <span className="flex items-center gap-x-2.5 w-full">
                <HomeIcon className="size-5 md:size-7 text-white font-bold" />

                <span className="text-white font-bold">Home</span>
              </span>

              <ChevronLeftIcon className="size-5 md:size-6 text-white font-bold rotate-180" />
            </Link>
          </div>
          <div className="py-2 md:py-3">
            <Link
              href="/p-admin/all-users"
              className={`flex items-center justify-between text-sm md:text-base font-danaMedium ${
                router.pathname === "/p-admin/all-users"
                  ? "**:text-sky-500"
                  : "text-white"
              }`}
            >
              <span className="flex items-center gap-x-2.5 w-full">
                <UserCircleIcon className="size-5 md:size-7 text-white font-bold" />

                <span className="text-white font-bold">All Users</span>
              </span>

              <ChevronLeftIcon className="size-5 md:size-6 text-white font-bold rotate-180" />
            </Link>
          </div>
          <div className="py-2 md:py-3">
            <Link
              href="/p-admin/add-product"
              className={`flex items-center justify-between text-sm md:text-base font-danaMedium ${
                router.pathname === "/p-admin/add-product"
                  ? "**:text-sky-500"
                  : "text-white"
              }`}
            >
              <span className="flex items-center gap-x-2.5 w-full">
                <PlusCircleIcon className="size-5 md:size-7 text-white font-bold" />

                <span className="text-white font-bold">Add Product</span>
              </span>

              <ChevronLeftIcon className="size-5 md:size-6 text-white font-bold rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {/* Logout Button pushed to bottom  */}
      <div
        className="mt-auto py-1 md:py-3 flex-center bg-light-gray rounded-md text-gray-400 cursor-pointer"
        onClick={logoutUser}
      >
        <ArrowLeftStartOnRectangleIcon className="size-6" />
        <a href="#">Sign out</a>
      </div>
    </aside>
  );
}

export default AdminPanleSidebar;
