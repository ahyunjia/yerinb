import {NextRequest, NextResponse} from "next/server";
import {fetchLetters, addLetter} from "../../../../data/firestore";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const letters = await fetchLetters();
        if (letters===null) {
            throw new Error();
        }
        return NextResponse.json(letters, {status: 200})
    } catch(err) {
        return NextResponse.json({}, {status:500})
    }
}

export async function POST(request) {
    try {
        const letter = await request.json();
        const addedLetter = await addLetter(letter);

        if (addedLetter === null) {
            throw new Error();
        }

        return NextResponse.json(addedLetter, {status: 200})
    } catch(err) {
        return NextResponse.json({}, {status:500})
    }
}