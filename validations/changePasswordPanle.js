import * as Yup from "yup";

const changePasswordPanleSchema = Yup.object({
  new_password: Yup.string()
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
  confirm_password: Yup.string()
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
});

export default changePasswordPanleSchema;