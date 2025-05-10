import UserState from "@/components/modules/UserState/UserState";
import React, { useEffect, useState } from "react";

import {
  CreditCardIcon,
  QuestionMarkCircleIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
  UserCircleIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import PanelInput from "@/components/modules/PanelForm/PanelInput";
import { useUser } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import changeUserInfosSchema from "@/validations/changeUserInfos";
import changePasswordPanle from "@/validations/changePasswordPanle";

function UserEditDetails() {
  const { user, fetchUser } = useUser();

  const {
    register: registerUser,
    handleSubmit: handleUserSubmit,
    reset,
    formState: { errors: userErrors },
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      phone_number: user?.phone_number || "",
      email: user?.email || "",
      avatar: "",
    },
    resolver: yupResolver(changeUserInfosSchema),
  });

  const {
    register: passwordChange,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordInput,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
    },
    resolver: yupResolver(changePasswordPanle),
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const updateUserInfos = async (newUserInfos) => {
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("username", newUserInfos.username);
    formData.append("phone_number", newUserInfos.phone_number);
    formData.append("email", newUserInfos.email);

    if (newUserInfos.avatar && newUserInfos.avatar[0]) {
      formData.append("avatar", newUserInfos.avatar[0]);
    }

    try {
      const res = await fetch("https://api.mander.ir/user/user-profile", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        await fetchUser();
        swal({
          title: "Your information has been successfully updated",
          icon: "success",
          buttons: "Ok",
        });
      } else {
        swal({
          title: data.message || "Something went wrong!",
          icon: "error",
          buttons: "Ok",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      swal({
        title: "Something Went Wrong",
        icon: "error",
        buttons: "Ok",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const updateNewPassword = async (changePassword) => {
    setIsUpdating(true);

    try {
      const res = await fetch("https://api.mander.ir/user/change-password", {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changePassword),
      });

      const data = await res.json();

      if (res.ok) {
        swal({
          title: "Your Password has been successfully updated",
          icon: "success",
          buttons: "Ok",
        });
        resetPasswordInput();
      } else {
        swal({
          title: data.message || "Something went wrong!",
          icon: "error",
          buttons: "Ok",
        });
      }
    } catch (err) {
      swal({
        title: "Something Went Wrong",
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        phone_number: user.phone_number,
        email: user.email,
      });
    }
  }, [user, reset]);

  return (
    <>
      {/* Infos(tickets, buying,...)  */}
      <div className="flex justify-center lg:justify-between flex-wrap gap-y-6 bg-white dark:bg-darker py-5 px-5 sm:px-8 rounded">
        <UserState
          title="Wallet Balance"
          count="0 $"
          icon={CreditCardIcon}
          iconeColor="text-blue-400"
        />
        <UserState
          title="Questions And Answers"
          count="1 question"
          icon={QuestionMarkCircleIcon}
          iconeColor="text-red-400"
        />
        <UserState
          title="My Total Tickets"
          count="2 tickets"
          icon={PresentationChartLineIcon}
          iconeColor="text-yellow-400"
        />
        <UserState
          title="Courses Being Learned"
          count="31 courses"
          icon={BookOpenIcon}
          iconeColor="text-green-400"
        />
      </div>

      {/* Change user details  */}
      <form onSubmit={handleUserSubmit(updateUserInfos)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 md:pr-5 mt-5">
          <PanelInput
            type="text"
            placeholder={"username"}
            icon={UserCircleIcon}
            error={userErrors.username?.message}
            {...registerUser("username")}
          />
          <PanelInput
            type="text"
            placeholder="phone"
            icon={DevicePhoneMobileIcon}
            error={userErrors.phone_number?.message}
            {...registerUser("phone_number")}
          />
          <PanelInput
            type="email"
            placeholder="email"
            icon={EnvelopeIcon}
            error={userErrors.email?.message}
            {...registerUser("email")}
          />
          <PanelInput
            type="file"
            placeholder="avatar"
            icon={EnvelopeIcon}
            error={userErrors.avatar?.message}
            {...registerUser("avatar")}
          />
        </div>

        <div className="flex-center flex-wrap mt-8 md:pr-5">
          <button
            disabled={isUpdating}
            className={`w-full sm:w-62 transition-colors py-3 rounded-md text-white ${
              isUpdating
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            Edit user account
          </button>
        </div>
      </form>

      {/* Change user password  */}
      <form
        onSubmit={handlePasswordSubmit(updateNewPassword)}
        id="edit-account-password"
        className="block mt-6 md:mt-10 pt-6 md:pt-10 border-t border-t-neutral-200 dark:border-t-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 md:pr-5">
          <PanelInput
            type="password"
            placeholder={"current password"}
            icon={LockClosedIcon}
            error={passwordErrors.old_password?.message}
            {...passwordChange("old_password")}
          />
          <PanelInput
            type="password"
            placeholder={"new password"}
            icon={LockClosedIcon}
            error={passwordErrors.new_password?.message}
            {...passwordChange("new_password")}
          />
        </div>

        <div className="flex-center flex-wrap mt-8 md:pr-5">
          <button
            disabled={isUpdating}
            className={`w-full sm:w-62 transition-colors py-3 rounded-md text-white ${
              isUpdating
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            EditChange Password
          </button>
        </div>
      </form>
    </>
  );
}

export default UserEditDetails;