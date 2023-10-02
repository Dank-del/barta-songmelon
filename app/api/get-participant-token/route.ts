import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const room = req.nextUrl.searchParams.get("room");
    const username = session?.user?.email;
    if (!room) {
        return NextResponse.json(
            { error: 'Missing "room" query parameter' },
            { status: 400 }
        );
    } else if (!username) {
        return NextResponse.json(
            { error: 'Missing "username" query parameter' },
            { status: 400 }
        );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
        return NextResponse.json(
            { error: "Server misconfigured" },
            { status: 500 }
        );
    }

    const at = new AccessToken(apiKey, apiSecret, { identity: username });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

    return NextResponse.json({ token: at.toJwt() });
}