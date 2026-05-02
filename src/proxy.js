
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getsession({
        headers: await headers ()

    });
    if (session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ["/All-Animals/:path", "/my-profile"],
}