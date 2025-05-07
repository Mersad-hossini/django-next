import * as Yup from "yup";

const signUpSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(12, "Username must not exceed 12 characters"),

  phone: Yup.string()
    .required("Phone number is required")
    .min(11, "Phone number must be at least 11 characters long") 
    .matches(
      /^[0-9+\-()]*$/,
      "Phone number can only contain numbers and valid symbols (+, -, ())"
    ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .test("has-letter", "Password must contain at least one letter", (value) =>
      /[a-zA-Z]/.test(value)
    )
    .test(
      "has-lowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value)
    )
    .test(
      "has-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email format"),
});

export default signUpSchema;
