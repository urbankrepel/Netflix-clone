import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
  }
);

export const config = {
  matcher: ["/home", "/subscription"],
};
