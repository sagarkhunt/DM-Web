import { NextResponse } from "next/server";

const middleware = (req) => {
  const { origin } = req.nextUrl;
  const token = req.cookies.get("token");
  const url = req.url;

  if (
    !token &&
    (url.includes(`/profile/account-profile`) ||
      url.includes(`/my-purchase`) ||
      url.includes(`/profile/profile-settings`))
  ) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  if (
    token &&
    (url === `${origin}/auth/login` ||
      url === `${origin}/auth/signup` ||
      url === `${origin}/auth/forgot-password` ||
      url === `${origin}/auth/reset-password`||
      url === `${origin}/auth/verify-email`)
  ) {
    return NextResponse.redirect(`${origin}/`);
  }
};

export default middleware;
