import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname === "/";
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

    // If there is no token or no connection we keep user on root page
    if (!token && isDashboardPage) {
      console.warn("No token, redirecting to /");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If there is a token move to dashboard
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Keep root always accessible
        if (req.nextUrl.pathname === "/") {
          return true;
        }
        return Boolean(token);
      },
    },
    pages: {
      signIn: "/",
    },
  },
);

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*"],
};
