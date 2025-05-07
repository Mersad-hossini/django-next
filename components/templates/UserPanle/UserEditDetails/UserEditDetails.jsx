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
import PanelInput from "@/components/modules/PanelForm/PanelInput";
import { useUser } from "@/context/UserContext";

function UserEditDetails() {
  const { user, loading } = useUser();
  console.log(user);
  
  const [form, setForm] = useState({
    username: user?.name,
    phone: user?.phone,
    email: user?.email,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value.trim() });
  };

  // const updateUserInfos = async (e) => {
  //   e.preventDefault();
  //   setIsUpdating(true);

  //   try {
  //     const res = await fetch(`/api/user/${userData._id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(form),
  //     });

  //     if (res.ok) {
  //       swal({
  //         title: "Your information has been successfully updated",
  //         icon: "success",
  //         buttons: "Ok",
  //       });
  //     } else {
  //       swal({
  //         title: "Something went wrong!",
  //         icon: "error",
  //         buttons: "Ok",
  //       });
  //     }
  //   } catch (err) {
  //     swal({
  //       title: "Something Went Wrong",
  //       icon: "error",
  //       buttons: "Ok",
  //     });
  //   }
  // };

  // const updateNewPassword = async (e) => {
  //   e.preventDefault();
  //   setIsUpdating(true);

  //   try {
  //     const res = await fetch(`/api/user/change-password/${userData._id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(passwordForm),
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       swal({
  //         title: "Your Password has been successfully updated",
  //         icon: "success",
  //         buttons: "Ok",
  //       });
  //     } else {
  //       swal({
  //         title: data.message || "Something went wrong!",
  //         icon: "error",
  //         buttons: "Ok",
  //       });
  //     }
  //   } catch (err) {
  //     swal({
  //       title: "Something Went Wrong",
  //       icon: "error",
  //       buttons: "Ok",
  //     });
  //   }
  // };

  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

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
      <form action="#">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 md:pr-5 mt-5">
          <PanelInput
            name="username"
            type="text"
            icon={UserCircleIcon}
            value={form.username}
            onChangeHandler={handleChange}
          />
          <PanelInput
            name="phone"
            type="text"
            icon={DevicePhoneMobileIcon}
            value={form.phone}
            onChangeHandler={handleChange}
          />
          <PanelInput
            name="email"
            type="email"
            icon={EnvelopeIcon}
            value={form.email}
            onChangeHandler={handleChange}
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
            // onClick={updateUserInfos}
          >
            Edit user account
          </button>
        </div>
      </form>
      {/* Change user password  */}
      <form
        id="edit-account-password"
        className="block mt-6 md:mt-10 pt-6 md:pt-10 border-t border-t-neutral-200 dark:border-t-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 md:pr-5">
          {/* {userData?.isPasswordSet !== false && (
            <PanelInput
              name="currentPassword"
              type="password"
              icon={LockClosedIcon}
              value={passwordForm.currentPassword}
              onChangeHandler={handlePasswordChange}
            />
          )} */}

          <PanelInput
            name="newPassword"
            type="password"
            icon={LockClosedIcon}
            value={passwordForm.newPassword}
            onChangeHandler={handlePasswordChange}
          />
        </div>

        <div className="flex-center flex-wrap mt-8 md:pr-5">
          <button
            disabled={isUpdating}
            className={`w-full sm:w-62 border transition-colors py-3 rounded-md text-white ${
              isUpdating
                ? "bg-gray-500 cursor-not-allowed"
                : "border-green-600 hover:bg-green-700 cursor-pointer"
            }`}
            // onClick={updateNewPassword}
          >
            {/* {userData?.hasPassword === false
              ? "Set Password"
              : "Change Password"} */}
          </button>
        </div>
      </form>
    </>
  );
}

export default UserEditDetails;
