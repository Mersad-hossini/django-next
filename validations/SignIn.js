import * as Yup from "yup";

const signInSchema = Yup.object({
  identifier: Yup.string()
    .required("Username or Email is required")
    .test(
      "is-valid-identifier",
      "Enter a valid username or email address",
      (value) => {
        if (!value) return false;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);
        return isEmail || isUsername;
      }
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export default signInSchema;