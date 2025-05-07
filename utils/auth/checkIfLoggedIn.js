import { verifyToken } from "./auth";

export const checkIfLoggedIn = async (context) => {
  const { token } = context.req.cookies;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      return {
        redirect: {
          destination: "/my-account",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};