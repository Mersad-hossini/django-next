import SignUpDetails from "@/components/templates/User/SignUpDetails/SignUpDetails";
import AuthGuard from "@/hocks/authGuard/authGuard";

export default function SignIn() {
  return (
    <AuthGuard requireAuth={false}>
      <SignUpDetails />
    </AuthGuard>
  );
}
