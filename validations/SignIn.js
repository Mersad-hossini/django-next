import * as Yup from "yup";

const signInSchema = Yup.object({
  identifier: Yup.string()
    .required("Username or Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export default signInSchema;