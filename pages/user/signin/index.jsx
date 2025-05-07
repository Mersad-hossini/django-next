import CheckIfLoggedIn from "@/utils/auth/checkIfLoggedIn";
import SignInDetails from "@/components/templates/User/SignInDetails/SignInDetails";

export default function SignIn() {
  return (
    <CheckIfLoggedIn redirectTo="/my-account">
      <SignInDetails />
    </CheckIfLoggedIn>
  );
}