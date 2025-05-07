import FormTitle from "@/components/modules/FormTitle/FormTitle";
import React, { useEffect, useState } from "react";
import InputForm from "@/components/modules/InputForm/InputForm";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import swal from "sweetalert";
import { useRouter } from "next/router";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter()

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return swal("Error", "Please enter your email.", "error");
    }

    setIsButtonDisabled(true);
    try {
      const res = await fetch("https://api.mander.ir/user/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        swal(
          "successful",
          "A password recovery link has been sent to you.",
          "success"
        );
        
        setEmail("");
      } else {
        swal("Error", data.message || "Something went wrong!", "error");
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
    <div className="flex-center h-screen bg-zinc-300">
      <div className="w-full sm:w-4/5 mx-auto lg:w-2/3 min-h-[600px] bg-white grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-md">
        {/* Left side  */}
        <div className="flex flex-col justify-center order-2 md:order-1 p-10">
          {/* Title SighIn  */}
          <div className="mb-3">
            <FormTitle title="Recover your password" />
          </div>

          <div className="flex-center flex-col">
            {/* email Input  */}
            <InputForm
              type="email"
              placeholder="Email"
              icon={EnvelopeIcon}
              value={email}
              onChangeHandler={(e) => setEmail(e.target.value)}
            />

            {/* recover Button  */}
            <div className="mt-7 w-full text-center">
              <button
                type="submit"
                onClick={handleForgetPassword}
                disabled={isButtonDisabled}
                className={`rounded-sm text-white py-2 w-[60%] transition-colors ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isButtonDisabled ? "Please wait..." : "Send recovery link"}
              </button>
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="order-1 sm:order-1">
          <img
            src="/images/forgetPass.png"
            className="w-full h-full object-cover"
            alt="register image"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
