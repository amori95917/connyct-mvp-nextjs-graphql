import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	// console.log(request.headers);
	const response = NextResponse.next();
	// some api calls with await.
	return response;
}
