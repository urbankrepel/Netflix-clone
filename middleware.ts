import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const isSubscribed = req.nextauth.token?.is_subscribed;
    const route = req.nextUrl.pathname;
    if (!isSubscribed && route !== "/subscription") {
      return NextResponse.redirect(new URL("/subscription", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
  }
);

export const config = {
  matcher: ["/home", "/subscription"],
};
