import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  
  if(token) {
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
    
    if (request.nextUrl.pathname.startsWith('/register')) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
  }
}