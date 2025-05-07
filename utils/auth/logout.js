import swal from "sweetalert";

const logoutUser = async () => {
  try {
    const res = await fetch("https://api.mander.ir/api/user/logout");

    if (res.ok) {
      swal({
        title: "You Logout Successfully",
        icon: "success",
        buttons: "Ok",
      }).then(() => {
        window.location.href = "/";
      });
    }
  } catch (err) {
    swal({
      title: "Error!!!",
      icon: "error",
      buttons: "Ok",
    });
  }
};

export default logoutUser;
