import FormTitle from "@/components/modules/FormTitle/FormTitle";
import InputForm from "@/components/modules/InputForm/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import swal from "sweetalert";
import {
  UserCircleIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import signUpSchema from "@/validations/signUp";

function SignUpDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userSubmitHandler = async (data) => {
    setLoading(true);

    try {
      const userInfos = {
        username: data.username,
        email: data.email,
        phone_number: data.phone,
        password: data.password,
      };

      const res = await fetch("https://api.mander.ir/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfos),
      });

      const responseData = await res.json();

      if (res.status === 201) {
        swal({
          title: "Registration successful",
          text: "Please check your email to verify your account before logging in",
          icon: "success",
          button: "Ok",
        });
        router.replace("/user/signin");
      } else {
        swal({
          title: responseData.message || "Something went wrong",
          icon: "warning",
          button: "Ok",
        });
      }
    } catch (error) {
      swal({
        title: "An error occurred",
        text: error.message || "Please try again later.",
        icon: "error",
        button: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center h-screen bg-zinc-300">
      <div className="w-full sm:w-4/5 mx-auto lg:w-2/3 min-h-[600px] bg-white grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-md">
        {/* Left side */}
        <div className="order-2 md:order-1 p-10 my-auto">
          <FormTitle title="Sign Up For Free" desc="Welcome Back Traveler" />

          <form
            className="flex-center flex-col"
            onSubmit={handleSubmit(userSubmitHandler)}
          >
            <InputForm
              type="text"
              placeholder="Username"
              icon={UserCircleIcon}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 mb-3">{errors.username.message}</p>
            )}

            <InputForm
              type="email"
              placeholder="Email"
              icon={EnvelopeIcon}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 mb-3">{errors.email.message}</p>
            )}

            <InputForm
              type="tel"
              placeholder="Phone"
              icon={DevicePhoneMobileIcon}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 mb-3">{errors.phone.message}</p>
            )}

            <InputForm
              type="password"
              placeholder="Password"
              icon={LockClosedIcon}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 mb-3">{errors.password.message}</p>
            )}

            {/* Sign Up Button */}
            <div className="mt-3 w-full text-center">
              <button
                type="submit"
                className="rounded-sm text-white py-1 bg-blue-500 w-[60%] cursor-pointer hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="mt-7 w-full text-center">
              <span className="text-sm text-gray-500">
                Already have an account?
              </span>
              <Link
                href="/user/signin"
                className="underline text-sm text-sky-600 ml-1"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>

        {/* Right side */}
        <div className="order-1 sm:order-1">
          <img
            src="/images/register.png"
            className="w-full h-full object-cover"
            alt="register image"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpDetails;