import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";
import Link from "next/link";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Your account has been activated.</title>
      </Head>
      <AuthGuard requireAuth={false}>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              You are successfully Sign In
            </h1>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/user/signin"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go To Login Page
              </Link>
            </div>
          </div>
        </main>
      </AuthGuard>
    </>
  );
}

export default index;