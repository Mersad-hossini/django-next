import { verifyToken } from "@/utils/auth/auth";


export const checkAuth = async (context) => {

  const { token } = context.req.cookies;

  if (!token) {
    return { redirect: { destination: "/user/signin", permanent: false } };
  }

  const tokenPayload = verifyToken(token);

  if (!tokenPayload) {
    return { redirect: { destination: "/user/signin", permanent: false } };
  }

  const user = await userModel.findOne(
    { email: tokenPayload.email },
    "-password"
  );

  if (!user) {
    return { redirect: { destination: "/user/signin", permanent: false } };
  }
  
  if (user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/my-account",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
