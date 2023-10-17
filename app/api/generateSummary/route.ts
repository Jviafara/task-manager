import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    //Todos in the body of the request
    const { todos } = await request.json();
    console.log(request);

    //
}
