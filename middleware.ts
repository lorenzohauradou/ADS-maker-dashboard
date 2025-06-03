import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
})

export const config = {
  // Protegge queste route - richiede autenticazione
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*", 
    "/create-video/:path*",
    "/api/protected/:path*"
  ]
} 