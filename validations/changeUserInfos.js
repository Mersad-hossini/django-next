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

  avatar: Yup.mixed()
    .test("fileFormat", "Image format is not allowed", (value) => {
      if (!value || !value[0]) return true; // Skip if no file selected
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
    .test("fileSize", "Image size must be less than 1MB", (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return file.size <= 1024 * 1024; // 1MB
    })
    .test(
      "imageDimensions",
      "Image must be between 500x500 and 1000x1000 pixels",
      (value) =>
        new Promise((resolve) => {
          if (!value || !value[0]) return resolve(true);

          const file = value[0];
          const img = new Image();
          const objectUrl = URL.createObjectURL(file);

          img.onload = () => {
            const { width, height } = img;
            URL.revokeObjectURL(objectUrl);
            resolve(
              width >= 500 && height >= 500 && width <= 1000 && height <= 1000
            );
          };

          img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(false);
          };

          img.src = objectUrl;
        })
    ),
});

export default changeUserInfosSchema;
