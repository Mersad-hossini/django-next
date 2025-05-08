import * as Yup from "yup";

const changeUserInfosSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(12, "Username must not exceed 12 characters"),

  phone_number: Yup.string()
    .required("Phone number is required")
    .min(11, "Phone number must be at least 11 characters long")
    .matches(
      /^[0-9+\-()]*$/,
      "Phone number can only contain numbers and valid symbols (+, -, ())"
    ),

  email: Yup.string()
    .required("Email is required")
    .min(12, "Email must be at least 12 characters long")
    .max(40, "Email must exceed 40 characters")
    .email("Please enter a valid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email format"),
});

export default changeUserInfosSchema;
