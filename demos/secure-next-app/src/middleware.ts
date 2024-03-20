import {
  getCSP,
  nonce,
  INLINE,
  NONE,
  SELF,
  REPORT_SAMPLE,
  STRICT_DYNAMIC,
} from "csp-header";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env.mjs";

const generateCsp = () => {
  const nonceKey = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = getCSP({
    directives: {
      "object-src": [NONE], // Prevents fetching and executing plugin resources
      "base-uri": [NONE], // Preventing attackers from changing the locations of scripts
      "script-src": [
        nonce(nonceKey), // Protected by nonce
        REPORT_SAMPLE, // Add code sample that caused the violation
        STRICT_DYNAMIC, // Allows the execution of scripts dynamically added to the page
        // Will be ignore but allow older browsers to work
        INLINE,
        "https:",
        "http:",
      ],
      "style-src": [nonce(nonceKey), SELF, REPORT_SAMPLE],
      "img-src": [SELF, "data:"],
      "form-action": [NONE],
      "frame-ancestors": [NONE],
    },
    reportUri: "/api/csp-report-violation",
  });
  return { csp, nonce: nonceKey };
};

export function middleware(request: NextRequest) {
  // only handle text/html requests
  const accept = request.headers.get("Accept");
  if (!accept?.includes("text/html")) {
    return;
  }

  const headerKey = env.CSP_REPORT_ONLY
    ? "content-security-policy-report-only"
    : "content-security-policy";

  // generate CSP and nonce
  const { csp, nonce } = generateCsp();

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // set nonce request header to read in pages if needed
  requestHeaders.set("x-nonce", nonce);

  // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  requestHeaders.set(headerKey, csp);

  // create new response
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Only force CSP for production
  // In development we want to allow eval scripts so that HMR works
  if (env.NODE_ENV === "production") {
    // Also set the CSP so that it is outputted to the browser
    response.headers.set(headerKey, csp);
  }

  //
  // The nonce is captured in the _document and applied to all script tags
  // make sure all pages are not static optimized, see App.getInitialProps

  return response;
}

/*
//
// Alternative implementation using next-auth
//
export const middleware = async (request: NextRequestWithAuth) => {
  const { csp, nonce } = generateCsp();
  const requestHeaders = new Headers(request.headers);
  if (process.env.NODE_ENV === 'production') {
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', csp);
  }

  // Execute the NextAuth middleware which either returns a redirect response or nothing, if authentication
  // was not required. See source for more: https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/next/middleware.ts#L99
  // If a redirect was returned, use it. Otherwise continue the response normally with NextResponse.next().
  // Omitting the config here, but you can still include it (i.e withAuth(request, { pages: ... }))
  const response = (await withAuth(request)) || NextResponse.next();

  // Set the CSP headers on the response
  if (response instanceof Response) {
    requestHeaders.forEach((value, key) => {
      response.headers.append(key, value);
    });
  }

  return response;
};
*/
