import { verifyToken } from "@/utils/auth/auth";

const redirectToLogin = () => ({
  redirect: {
    destination: "/user/signin",
    permanent: false,
  },
});

export const requireLogin = async (context) => {

  // const { token } = context.req.cookies;

  // if (!token) return redirectToLogin();

  // const payload = verifyToken(token);
  // if (!payload) return redirectToLogin();

  // const user = await userModel.findOne(
  //   { email: payload.email },
  //   "-password"
  // ); Api

  // if (!user) return redirectToLogin();

  // return {
  //   props: {
  //     user: JSON.parse(JSON.stringify(user)),
  //   },
  // };
};
