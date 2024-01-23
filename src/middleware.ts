import { auth } from "@/config/auth";

export const middleware = auth;

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - auth/signin (login page)
         * - images/bgs (background images)
         * - robots.txt (SEO)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|auth/signin|images|robots.txt).*)",
    ],
};
