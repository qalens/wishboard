import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Your frontend's address: http://localhost:3000 or https://my.production.domain.com
const WEB_ADDRESS = process.env.NEXT_PUBLIC_BASE_URL;

// Your cookie's name, usually specified by the backend.
const cookieName = "session";

export async function GET(req: Request) {
  // Tell Next.js to purge the entire cache, no stale data should stay after the redirect back to the index page.
  revalidatePath("/", "layout");

  // You can redirect back to the index, or to another page such as /login
  const destination = `${WEB_ADDRESS}/`;

  // Clear the session cookie explicitly. Generally this can be done by just
  // using Set-Cookie: <cookie-name>=; but Next.js gives us an API to do it.
  (await cookies()).delete(cookieName);

  return NextResponse.redirect(destination, {
    headers: {
      // Some browsers accept this directive to clear cookies and other data.
      "Clear-Site-Data": `"*"`,

      // Next.js accepts this directive to clear its own client fetch cache.
      "Cache-Control": "no-store",
    },
  });
}