import FormTitle from "@/components/modules/FormTitle/FormTitle";
import InputForm from "@/components/modules/InputForm/InputForm";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import swal from "sweetalert";
import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import signInSchema from "@/validations/signIn";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/context/UserContext";

function SignInDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const router = useRouter();
  const { storeTokens } = useUser();

  const loginHandler = async (data) => {
    try {
      const userLoginInfos = {
        username_or_email: data.identifier,
        password: data.password,
      };

      const res = await fetch("https://api.mander.ir/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userLoginInfos),
      });

      const userData = await res.json();

      if (res.status === 200) {
        storeTokens(userData.access, userData.refresh);

        swal({
          title: "You have successfully logged in",
          icon: "success",
          button: "Ok",
        });

        router.replace("/");
      } else {
        swal({
          title: userData.message || "Login failed",
          icon: "warning",
          button: "Ok",
        });
      }
    } catch (err) {
      swal({
        title: "Something went wrong!",
        text: err.message,
        icon: "error",
        button: "Ok",
      });
    }
  };

  return (
    <div className="flex-center h-screen bg-zinc-300">
      <div className="w-full sm:w-4/5 mx-auto lg:w-2/3 min-h-[600px] bg-white grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-md">
        {/* Left side  */}
        <div className="order-2 md:order-1 my-auto py-3">
          <FormTitle title="Sign In" desc="Welcome Back Traveler" />

          <form
            className="flex-center flex-col"
            onSubmit={handleSubmit(loginHandler)}
          >
            <InputForm
              type="text"
              placeholder="Username or Email"
              icon={UserCircleIcon}
              {...register("identifier")}
            />
            {errors.identifier && (
              <p className="text-red-500 mb-3">{errors.identifier.message}</p>
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

            <div className="flex items-center justify-evenly my-1 w-full px-20 md:px-0 flex-col sm:flex-row">
              <Link
                href="/user/forget-password"
                className="underline text-sm text-sky-600"
              >
                Forget Password?
              </Link>
            </div>

            <div className="mt-7 w-full text-center">
              <button className="rounded-sm text-white py-1 bg-blue-500 w-[60%] cursor-pointer hover:bg-blue-600 transition-colors">
                Sign In
              </button>
            </div>

            <div className="mt-7 w-full text-center">
              <span className="text-sm text-gray-500">
                Don't have an account?
              </span>
              <Link
                href="/user/signup"
                className="underline text-sm text-sky-600 ml-1"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>

        <div className="order-1 sm:order-1 hidden ms:block">
          <img
            src="/images/login.png"
            className="w-full h-full object-cover"
            alt="register image"
          />
        </div>
      </div>
    </div>
  );
}

export default SignInDetails;