import * as Yup from "yup";

const passwordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .test("has-letter", "Password must contain at least one letter", (value) =>
      /[a-zA-Z]/.test(value)
    )
});

export default passwordSchema;
