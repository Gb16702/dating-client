import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = {
  admin: ["/admin"],
  authenticated: ["/", "/profile", "/admin"],
  unauthenticated: ["/authentification/connexion", "/authentification/inscription", "/authentification/forgot-password"],
};

async function decodeToken(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/authentication/verify-session-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes(".") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const token = cookies().get("token")?.value;

  if (token) {
    const { user } = await decodeToken(token);

    if (!user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}authentification/connexion`);
    }

    if (user.is_profile_complete && pathname.includes("/profil/configuration")) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}`);
    }

    if (!user.is_profile_complete && !pathname.includes("/profil/configuration")) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}${token}/profil/configuration`);
    }

    if (protectedRoutes.admin.includes(pathname) && !user.is_admin) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}`);
    }

    if (protectedRoutes.unauthenticated.includes(pathname)) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}`);
    }
  } else if (!protectedRoutes.unauthenticated.includes(pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT}authentification/connexion`);
  }

  return NextResponse.next();
}
