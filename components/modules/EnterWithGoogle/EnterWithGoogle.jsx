import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
import { useRouter } from "next/router";

function EnterWithGoogle() {
  const router = useRouter();

  const handleGoogleSignIn = (response) => {
    const payload = jwtDecode(response.credential);
    sendUserDataToServer(payload);
  };

  const sendUserDataToServer = async (payload) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          username: payload.name,
          googleId: payload.sub,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        swal({
          title: data.message || "Successful",
          icon: "success",
          button: "Ok",
        });

        router.replace("/"); 
      } else if(res.status === 201) {
        swal({
          title: data.message || "Successful",
          icon: "success",
          button: "Ok",
        });

        router.replace("/"); 
      } else {        
        swal({
          title: data.message || "Failed",
          icon: "success",
          button: "Ok",
        });
      }
    } catch (error) {
      swal({
        title: "Something went wrong!",
        text: error.message,
        icon: "error",
        button: "Ok",
      });
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "597031170521-siqihiumrui70b5n62qj26if5clkr4o0.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
      });

      window.google.accounts.id.renderButton(document.querySelector(".auth"), {
        theme: "outline",
        size: "large",
      });
    } else {
      console.log("Google API is not loaded.");
    }
  }, []);

  return <div className="flex-center gap-x-4 mt-8 auth"></div>;
}

export default EnterWithGoogle;