import * as Yup from "yup";

const categorySchema = Yup.object().shape({
  title: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters"),

  slug: Yup.string()
    .required("URL name is required")
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "URL name must be (lowercase, dashes only)"
    ),
  is_active: Yup.boolean().notRequired(),
});

export default categorySchema;