import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        console.log("token from middleware:", token);

        return token?.role === "admin";
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
