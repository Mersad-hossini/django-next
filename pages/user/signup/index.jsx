// pages/signin.jsx
import CheckIfLoggedIn from "@/utils/auth/checkIfLoggedIn";
import SignUpDetails from "@/components/templates/User/SignUpDetails/SignUpDetails";

export default function SignIn() {
  return (
    <CheckIfLoggedIn redirectTo="/my-account">
      <SignUpDetails />
    </CheckIfLoggedIn>
  );
}