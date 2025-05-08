import * as Yup from "yup";

const productSchema = Yup.object().shape({
  productName: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters"),

  urlName: Yup.string()
    .required("Slug (URL name) is required")
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be URL-friendly (lowercase, dashes only)"
    ),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than zero")
    .integer("Price must be an integer"),

  image: Yup.string()
    .required("Image is required"),

  category: Yup.string()
    .required("Category is required"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must not exceed 1000 characters"),
});

export default productSchema