import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER;
const CLIENT_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT;

const protectedRoutes = {
  admin: ["/admin"],
  authenticated: ["/", "/profile", "/dashboard"],
  unauthenticated: ["/authentification"],
};

async function decodeToken({ value: token }: { value: string }) {
  try {
    console.log(token);

    const response = await fetch(`${SERVER_ENDPOINT}api/authentication/verify-session-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("OK");

      return data;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes(".") || request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // // Get the token from the request cookies
  // const token = cookies().get("token");

  // // Handle unauthenticated and authenticated users
  // if (token) {
  //   const userData = await decodeToken(token);
  //   console.log(userData);

  //   const user = userData?.user;

  //   if (!user) {
  //     // Redirect unauthenticated user to login page
  //     return NextResponse.redirect(new URL("/authentification/connexion", CLIENT_ENDPOINT));
  //   }

  //   // Handle special case for setting the session cookie
  //   if (request.nextUrl.pathname === "/authentification/temp") {
  //     const sessionID = request.nextUrl.searchParams.get("sessionId");
  //     if (sessionID) {
  //       const response = NextResponse.redirect(new URL("/", CLIENT_ENDPOINT));
  //       response.cookies.set("token", sessionID, { path: "/" });
  //       return response;
  //     }
  //   }

  //   if (user.is_admin) {
  //     // Allow admin to proceed
  //     return NextResponse.next();
  //   }

  //   // Redirect non-admin trying to access admin-only page
  //   if (request.nextUrl.pathname.startsWith(protectedRoutes.admin[0])) {
  //     return NextResponse.redirect(new URL("/", CLIENT_ENDPOINT));
  //   }

  //   // Redirect to profile configuration if profile is not complete
  //   if (!user.is_profile_complete && !request.nextUrl.pathname.startsWith("/profil/configuration")) {
  //     return NextResponse.redirect(new URL("/profil/configuration", CLIENT_ENDPOINT));
  //   }

  //   // Allow access to profile configuration if profile is not complete
  //   if (!user.is_profile_complete && request.nextUrl.pathname.startsWith("/profil/configuration")) {
  //     return NextResponse.next();
  //   }

  //   // Redirect away from profile configuration if profile is complete
  //   if (user.is_profile_complete && request.nextUrl.pathname.startsWith("/profil/configuration")) {
  //     return NextResponse.redirect(new URL("/", CLIENT_ENDPOINT));
  //   }
  // } else {
  //   // Redirect to login if trying to access protected routes while unauthenticated
  //   if (!protectedRoutes.unauthenticated.some(path => request.nextUrl.pathname.startsWith(path))) {
  //     return NextResponse.redirect(new URL("/authentification/connexion", CLIENT_ENDPOINT));
  //   }
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: [...protectedRoutes.authenticated, ...protectedRoutes.admin, "/authentification/temp"],
// };
