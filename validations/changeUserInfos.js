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
    .test("fileSize", "Image size must be less than 1MB", (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return file.size <= 1024 * 1024; // 1MB
    })
    .test(
      "imageDimensions",
      "Image must be between 100x100 and 500x500 pixels",
      (value) =>
        new Promise((resolve) => {
          if (!value || value.length === 0) return resolve(true);

          const file = value[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const { width, height } = img;
              resolve(
                width >= 100 && height >= 100 && width <= 500 && height <= 500
              );
            };
            img.onerror = () => resolve(false);
            img.src = e.target.result;
          };

          reader.readAsDataURL(file);
        })
    ),
});

export default changeUserInfosSchema;