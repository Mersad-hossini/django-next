import React, { useState, useRef, useEffect } from "react";
import {
  UserIcon,
  HomeIcon,
  PencilSquareIcon,
  PowerIcon,
  UserCircleIcon,
  GlobeAsiaAustraliaIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import logoutUser from "@/utils/auth/logout";
import { useRouter } from "next/router";

function UserBoxNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [userTag, setUserTag] = useState("");
  const dropdownRef = useRef(null);

  const router = useRouter()

  const toggleDropdown = () => {
    setIsUserDetailsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDetailsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.status === 200) {
          const user = await res.json();
          if (user?.data) {
            if (user.data.role === "ADMIN") {
              setIsAdmin(true);
            }

            setIsLoggedIn(true);
            setUserTag(user.data.username);
          }
        }
      } catch (err) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserTag(null);
      }
    };
    userAuth();
  }, []);



  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="size-13 flex-center rounded-full bg-light-gray text-slate-500 cursor-pointer"
        onClick={toggleDropdown}
      >
        <UserIcon className="size-5.5 sm:size-6 text-white" />
      </div>
      {/* User Box */}
      {isUserDetailsOpen && (
        <div
          className="absolute left-0 top-full pt-6 z-10 transition-all"
          id="user-profile-dropdown"
        >
          <div className="w-[278px] bg-white dark:bg-darker p-5 pb-3.5 rounded-lg">
            {/* User Info  */}
            {isLoggedIn && (
              <div className="flex items-center border-b border-b-neutral-200 dark:border-b-white/5 pb-5 mb-2">
                <Link href="/my-account" className="shrink-0">
                  <img
                    src="/images/user-image.png"
                    alt="namiko"
                    className="object-cover w-14 h-14 rounded-full inline-block"
                    loading="lazy"
                  />
                </Link>
                <div className="ml-3.5 flex flex-col gap-y-3 overflow-hidden">
                  <span className="text-lg inline-block truncate text-white">
                    {userTag}
                  </span>
                </div>
              </div>
            )}
            <Link
              href="/"
              className="flex items-center justify-between text-white px-2.5 h-12 rounded-xl hover:text-white hover:bg-green-500 transition-colors"
            >
              <span className="flex items-center gap-x-2">
                <HomeIcon className="w-6 h-6" />
                Home Page
              </span>
            </Link>
            {/* Dashboard Links  */}

            {isLoggedIn && isAdmin && (
              <Link
                href="/p-admin/"
                className="flex items-center justify-between text-white px-2.5 h-12 rounded-xl hover:text-white hover:bg-green-500 transition-colors"
              >
                <span className="flex items-center gap-x-2">
                  <GlobeAsiaAustraliaIcon className="w-6 h-6" />
                  Admin Panel
                </span>
              </Link>
            )}

            {isLoggedIn && (
              <>
                <Link
                  href="/my-account/"
                  className="flex items-center justify-between text-white px-2.5 h-12 rounded-xl hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <UserCircleIcon className="w-6 h-6" />
                    User Panel
                  </span>
                </Link>
                <Link
                  href="/my-account/edit-account"
                  className="flex items-center justify-between text-white px-2.5 h-12 rounded-xl hover:text-white hover:bg-green-500 transition-colors"
                >
                  <span className="flex items-center gap-x-2">
                    <PencilSquareIcon className="w-6 h-6" />
                    Edit Account
                  </span>
                </Link>
              </>
            )}

            {/* Logout And Sign In /Signup Link  */}
            <div className="mt-2 pt-2 border-t text-white border-t-neutral-200 dark:border-t-white/5">
              {isLoggedIn ? (
                <>
                  {" "}
                  <Link
                    href="#"
                    className="flex items-center justify-between px-2.5 h-12 rounded-xl hover:text-white hover:bg-red-500 transition-colors"
                    onClick={logoutUser}
                  >
                    <span className="flex items-center gap-x-2">
                      <PowerIcon className="w-6 h-6" />
                      Logout
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link
                    href="/user/signin"
                    className="flex items-center justify-between text-white px-2.5 h-12 rounded-xl hover:text-white hover:bg-green-500 transition-colors"
                  >
                    <span className="flex items-center gap-x-2">
                      <ArrowDownCircleIcon className="w-6 h-6" />
                      Sign In /Signup
                    </span>
                  </Link>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBoxNav;
