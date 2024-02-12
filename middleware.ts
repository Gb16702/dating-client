import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER as string;
const CLIENT_ENDPOINT = process.env.NEXT_PUBLIC_CLIENT as string;

const ADMIN_ROUTE = "/admin";
const UNAUTHENTICATED_ROUTE = "/authentification";

function redirectToLogin(clientEndpoint: string): NextResponse {
  return NextResponse.redirect(new URL(`${UNAUTHENTICATED_ROUTE}/connexion`, clientEndpoint));
}

function redirectToProfileConfiguration(userId: string, clientEndpoint: string): NextResponse {
  return NextResponse.redirect(new URL(`${userId}/profil/configuration`, clientEndpoint));
}

function redirectToHome(clientEndpoint: string): NextResponse {
  return NextResponse.redirect(new URL("/", clientEndpoint));
}

interface Data {
  user: {
    id: string;
    is_profile_complete: boolean;
    is_admin: boolean;
  },
  error: string
}

async function validateUser(token: string): Promise<Data | null> {
  try {
    const response = await fetch(`${SERVER_ENDPOINT}api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json()
  } catch (error) {
    console.error("Error validating user:", error);
    return null;
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (
    request.nextUrl.pathname.includes(".") ||
    request.nextUrl.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const token = cookies().get("token");
  const isAuthPage = request.nextUrl.pathname.startsWith(UNAUTHENTICATED_ROUTE);
  const isAdminRoute = request.nextUrl.pathname.startsWith(ADMIN_ROUTE);

  if (!token && !isAuthPage) {
    return redirectToLogin(CLIENT_ENDPOINT);
  }

  if (token) {
    const { data: user } = await validateUser(token.value) as any;

    if (user) {
      if (user.error && !isAuthPage) {
        return redirectToLogin(CLIENT_ENDPOINT);
      }

      if (user && isAuthPage) {
        return redirectToHome(CLIENT_ENDPOINT);
      }

      const isSetupProfilePage = request.nextUrl.pathname.startsWith(
        `/${user.id}/profil/configuration`
      );

      if (!user.is_profile_complete && !isSetupProfilePage) {
        return redirectToProfileConfiguration(user.id, CLIENT_ENDPOINT);
      } else if (user.is_profile_complete && isSetupProfilePage) {
        return redirectToHome(CLIENT_ENDPOINT);
      }

      if (isAdminRoute && !user.is_admin) {
        return redirectToHome(CLIENT_ENDPOINT);
      }
    } else if (!isAuthPage) {
      return redirectToLogin(CLIENT_ENDPOINT);
    }
  }
  return NextResponse.next();
}