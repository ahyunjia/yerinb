import {NextRequest, NextResponse} from "next/server";
import { fetchPhotoCard } from "../../../../data/firestore";

export async function GET(request) {
    try {
        const pc_idx = getRandomInt()
        console.log(pc_idx)
        const img = await fetchPhotoCard(pc_idx);
        if (img === null) {
            return new Response(null, {status: 204})
          }
        return NextResponse.json(img, {status: 200})
    } catch(err) {
        return NextResponse.json({}, {status:500})
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * process.env.PHOTOCARD_MAX);
}