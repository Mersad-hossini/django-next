import React, { useEffect } from "react";
import {
  AcademicCapIcon,
  PencilSquareIcon,
  ChevronLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  XMarkIcon,
  HomeIcon,
  GlobeAsiaAustraliaIcon,
  ArrowDownCircleIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import logoutUser from "@/utils/auth/logout";
import { useUser } from "@/context/UserContext";

function HomeSidebar({ isOpen, setIsOpen }) {
  const { user } = useUser();

  const closeSidebarHandler = () => {
    setIsOpen(false);
  };

  const router = useRouter();
  return (
    <aside
      className={`fixed left-0 bottom-0 top-0 w-67 flex flex-col shrink-0 bg-darker py-4.5 px-6 z-50 overflow-y-auto transition-transform duration-300 md:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Moblie links  */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex gap-x-3">
          <div className="switch-theme btn only-icon bg-white/5 text-white"></div>
          <div className="size-13 flex-center rounded-full bg-light-gray text-slate-500 cursor-pointer close-sidebar">
            <XMarkIcon
              className="size-5.5 sm:size-6 text-white"
              onClick={closeSidebarHandler}
            />
          </div>
        </div>
      </div>

      {/* Top User Info  */}
      {user && (
        <div className="relative bg-sky-500 text-white rounded md:h-[140px] px-3 py-3 md:pt-5 mb-8 md:mb-20 text-center">
          <span className="block font-danaDemiBold truncate">
            {user?.username}
          </span>
          <span className=" text-red-400 font-bold mt-2.5">
            {user?.role === "admin" ? "Admin" : "User"}
          </span>
          <div className="md:block relative -mb-11 mx-auto mt-3.5 size-22 p-1 bg-gradient-to-b from-white/40 to-white/0 to-100% shadow-md rounded-full">
            <img
              src={
                user?.avatar ||
                "https://secure.gravatar.com/avatar/ff8c64ea5e4724a9bffca0a348cf405a?s=96&amp;d=mm&amp;r=g"
              }
              className="size-full object-cover rounded-full"
              alt="namiko"
            />
            <div className="absolute left-1 bottom-1 flex items-center justify-center size-6 bg-sky-500 border-2 border-white rounded-full">
              <AcademicCapIcon className="size-3" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content (wrapped in a grow container)  */}
      <div className="flex-grow">
        <div className="divide-y divide-white/10 child:relative first-child:pt-0 last-child:pb-0 mb-10">
          <div className="py-2 md:py-3">
            <Link
              href="/"
              className={`flex items-center justify-between text-sm md:text-base font-danaMedium ${
                router.pathname === "/" ? "**:text-sky-500" : "text-white"
              }`}
            >
              <span className="flex items-center gap-x-2.5 w-full">
                <HomeIcon className="size-5 md:size-7 text-white font-bold" />

                <span className="text-white font-bold">Home</span>
              </span>

              <ChevronLeftIcon className="size-5 md:size-6 text-white font-bold rotate-180" />
            </Link>
          </div>

          {user?.role === "admin" && (
            <div className="py-2 md:py-3">
              <Link
                href="/p-admin"
                className={`flex items-center justify-between text-sm md:text-base font-danaMedium ${
                  router.pathname === "/my-account/edit-account"
                    ? "**:text-sky-500"
                    : "text-white"
                }`}
              >
                <span className="flex items-center gap-x-2.5 w-full">
                  <GlobeAsiaAustraliaIcon className="size-5 md:size-7 text-white font-bold" />

                  <span className="text-white font-bold">Admin Panel</span>
                </span>

                <ChevronLeftIcon className="size-5 md:size-6 text-white font-bold rotate-180" />
              </Link>
            </div>
          )}

          {user && (
            <div className="py-2 md:py-3">
              <Link
                href="/my-account/"
                className={`flex items-center justify-between text-sm md:text-base font-danaMedium ${
                  router.pathname === "/my-account"
                    ? "**:text-sky-500"
                    : "text-white"
                }`}
              >
                <span className="flex items-center gap-x-2.5 w-full">
                  <GlobeEuropeAfricaIcon className="size-5 md:size-7 text-white font-bold" />

                  <span className="text-white font-bold">User Panel</span>
                </span>

                <ChevronLeftIcon className="size-5 md:size-6 text-white font-bold rotate-180" />
              </Link>
            </div>
          )}

          {user && (
            <div className="py-2 md:py-3">
              <Link
                href="/my-account/edit-account"
                className={`flex items-center justify-between text-sm md:text-base font-danaMedium ${
                  router.pathname === "/my-account/edit-account"
                    ? "**:text-sky-500"
                    : "text-white"
                }`}
              >
                <span className="flex items-center gap-x-2.5 w-full">
                  <PencilSquareIcon className="size-5 md:size-7 text-white font-bold" />

                  <span className="text-white font-bold">Edit Account</span>
                </span>

                <ChevronLeftIcon className="size-5 md:size-6 text-white font-bold rotate-180" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button pushed to bottom  */}
      {user ? (
        <div
          className="mt-auto py-1 md:py-3 flex-center bg-light-gray rounded-md text-gray-400 cursor-pointer"
          onClick={logoutUser}
        >
          <ArrowLeftStartOnRectangleIcon className="size-6" />
          <a href="#">Sign out</a>
        </div>
      ) : (
        <div className="mt-auto py-1 md:py-3 flex-center bg-light-gray rounded-md text-gray-400 cursor-pointer">
          <ArrowDownCircleIcon className="size-6 mr-2" />
          <Link href="/user/signin">Signin/Signup</Link>
        </div>
      )}
    </aside>
  );
}

export default HomeSidebar;
