import SignInDetails from "@/components/templates/User/SignInDetails/SignInDetails";
import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>sign in</title>
      </Head>
      <AuthGuard requireAuth={false}>
        <SignInDetails />
      </AuthGuard>
    </>
  );
}