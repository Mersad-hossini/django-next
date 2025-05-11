import SignUpDetails from "@/components/templates/User/SignUpDetails/SignUpDetails";
import AuthGuard from "@/hocks/authGuard/authGuard";
import Head from "next/head";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>signup</title>
      </Head>
      <AuthGuard requireAuth={false}>
        <SignUpDetails />
      </AuthGuard>
    </>
  );
}