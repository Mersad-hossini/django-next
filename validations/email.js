import * as Yup from "yup";

const emailSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .min(12, "Email must be at least 12 characters long")
    .max(40, "Email must exceed 40 characters")
    .email("Please enter a valid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email format"),
});

export default emailSchema;
