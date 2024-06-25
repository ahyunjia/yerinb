import {NextRequest, NextResponse} from "next/server";
import { addWishCount } from "../../../../data/firestore";


export async function GET(request) {
    try {
        const count = await addWishCount();
        if (count === null) {
            return new Response(null, {status: 204})
          }
        return NextResponse.json(count, {status: 200})
    } catch(err) {
        return NextResponse.json({}, {status:500})
    }
}