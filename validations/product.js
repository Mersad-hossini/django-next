import * as Yup from "yup";
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

const productSchema = Yup.object().shape({
  title: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters"),

  slug: Yup.string()
    .required("URL name is required")
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "URL name must be (lowercase, dashes only)"
    ),

  price: Yup.string()
    .required("Price is required")
    .test("is-number", "Price must be a number", (value) => !isNaN(value))
    .test(
      "is-positive",
      "Price must be greater than zero",
      (value) => Number(value) > 0
    )
    .test(
      "is-integer",
      "Price must be an integer",
      (value) => Number(value) % 1 === 0
    ),

  image: Yup.mixed()
    .required("Image is required")
    .test("fileFormat", "Image format is not allowed", (value) => {
      if (!value || !value[0]) return false;
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/tiff",
        "image/webp",
      ];
      return allowedTypes.includes(value[0].type);
    })
    .test("fileSize", "Image must be smaller than 5MB", (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= FILE_SIZE_LIMIT;
    })
    .test(
      "imageDimensions",
      "Image dimensions must be between 500x500 and 1500x1500 pixels",
      (value) =>
        new Promise((resolve) => {
          if (!value || !value[0]) return resolve(false);

          const file = value[0];
          const img = new Image();
          const objectUrl = URL.createObjectURL(file);

          img.onload = () => {
            const { width, height } = img;
            URL.revokeObjectURL(objectUrl);
            resolve(
              width >= 500 && height >= 500 && width <= 1500 && height <= 1500
            );
          };

          img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(false);
          };

          img.src = objectUrl;
        })
    ),

  categories: Yup.string()
    .required("Category is required")
    .notOneOf(["-1"], "Please select a valid category"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(3000, "Description must not exceed 1000 characters"),

  is_active: Yup.boolean().notRequired(),
});

export default productSchema;