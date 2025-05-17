import FormTitle from "@/components/modules/FormTitle/FormTitle";
import React, { useEffect, useState } from "react";
import InputForm from "@/components/modules/InputForm/InputForm";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import emailSchema from "@/validations/email";
import PublicNavbar from "@/components/modules/PublicNavbar/PublicNavbar";
import HomeSidebar from "@/components/modules/HomeSidebar/HomeSidebar";
import Footer from "@/components/modules/Footer/Footer";

function ForgetPassword() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(emailSchema),
  });

  const handleForgetPassword = async (data) => {
    if (!data.email) {
      return swal("Error", "Please enter your email..", "error");
    }

    setIsButtonDisabled(true);
    try {
      const res = await fetch("https://api.mander.ir/user/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const userData = await res.json();

      if (res.ok) {
        swal(
          "successful",
          "A password recovery link has been sent to you.",
          "success"
        );
      } else {
        swal("Error", userData.message || "Something went wrong!", "error");
      }
    } catch (err) {
      swal(
        "Error",
        err.message || "An error occurred while communicating with the server.",
        "error"
      );
    }
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

  return (
    <div className="bg-zinc-300">
      <PublicNavbar setIsOpen={setIsSidebarOpen} />
      <HomeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-center my-10">
        <div className="w-full sm:w-4/5 mx-auto lg:w-2/3 min-h-[600px] bg-white grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-md">
          <div className="flex flex-col justify-center order-2 md:order-1 py-3">
            <div className="mb-3">
              <FormTitle title="Recover your password" />
            </div>

            <form
              onSubmit={handleSubmit(handleForgetPassword)}
              className="flex-center flex-col"
            >
              <InputForm
                type="email"
                placeholder="Email"
                icon={EnvelopeIcon}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 mb-3">{errors.email.message}</p>
              )}

              <div className="mt-7 w-full text-center">
                <button
                  type="submit"
                  disabled={isButtonDisabled || !isValid}
                  className={`rounded-sm text-white py-2 w-[60%] transition-colors ${
                    isButtonDisabled || !isValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 cursor-pointer"
                  }`}
                >
                  {isButtonDisabled ? "Please wait..." : "Send recovery link"}
                </button>
              </div>
            </form>
          </div>

          <div className="order-1 sm:order-1 hidden ms:block">
            <img
              src="/images/forgetPass.png"
              className="w-full h-full object-cover"
              alt="register image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgetPassword;
