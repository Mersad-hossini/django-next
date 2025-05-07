import FormTitle from "@/components/modules/FormTitle/FormTitle";
import React, { useState, useEffect } from "react";
import InputForm from "@/components/modules/InputForm/InputForm";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import swal from "sweetalert";
import { useRouter } from "next/router";

function ResetPassword({ resetCode }) {
  const [password, setPassword] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const newPassword = {
      password,
      password_confirm: password,
    };

    try {
      const res = await fetch(
        `https://api.mander.ir/user/reset-password/${resetCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPassword),
        }
      );

      const data = await res.json();

      if (res.ok) {
        swal("Password changed successfully.", "", "success");
        setPassword("");
        router.replace("/user/signin");
      } else {
        swal("Error", data.message || "Somethin went wrong!", "error");
      }
    } catch (error) {
      swal(
        "Error",
        error.message || "Connection to the server failed.",
        "error"
      );
    }
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="flex-center h-screen bg-zinc-300">
      <div className="w-full sm:w-4/5 mx-auto lg:w-2/3 min-h-[600px] bg-white grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-md">
        {/* Left side  */}
        <div className="flex flex-col justify-center order-2 md:order-1 p-10">
          <div className="mb-3">
            <FormTitle title="New password" />
          </div>

          <div className="flex-center flex-col">
            <InputForm
              type="password"
              placeholder="New Password"
              icon={LockClosedIcon}
              value={password}
              onChangeHandler={(e) => setPassword(e.target.value)}
            />

            <div className="mt-7 w-full text-center">
              <button
                onClick={handleResetPassword}
                disabled={!password || cooldown > 0}
                className={`rounded-sm text-white py-1 w-[60%] transition-colors ${
                  !password || cooldown > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 cursor-pointer"
                }`}
              >
                {cooldown > 0 ? `Wait ${cooldown}s` : "Ok"}
              </button>
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="order-1 sm:order-1">
          <img
            src="/images/new-password.png"
            className="w-full h-full object-cover"
            alt="register image"
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
