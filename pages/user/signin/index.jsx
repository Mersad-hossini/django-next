import SignInDetails from "@/components/templates/User/SignInDetails/SignInDetails";
import AuthGuard from "@/hocks/authGuard/authGuard";

export default function SignIn() {
  return (
    <AuthGuard requireAuth={false}>
      <SignInDetails />
    </AuthGuard>
  );
}
