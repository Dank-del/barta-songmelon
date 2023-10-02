"use client";

import '@livekit/components-styles';
import {
    LiveKitRoom,
    formatChatMessageLinks,
    VideoConference
} from '@livekit/components-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoomConnectOptions } from "livekit-client";
import React, { useMemo } from 'react';
import {useSession} from "next-auth/react";

export default function Page() {
    const searchParams = useSearchParams();
    const session = useSession();
    const room = searchParams.get("id");
    const name = session.data?.user?.email
    const [token, setToken] = useState("");

    if (session.status === "unauthenticated") {
        window.location.href = "/"
    }

    const connectOptions = useMemo((): RoomConnectOptions => {
        return {
            autoSubscribe: true,
        };
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (typeof session.data === "undefined") return
                const resp = await fetch(
                    `/api/get-participant-token?room=${room}`
                );
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [name, room]);



    if (token === "") {
        return <div>Getting token...</div>;
    }


    return (
        <LiveKitRoom
            video={false}
            audio={false}
            token={token}
            connectOptions={connectOptions}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default"
            // style={{ height: '100dvh' }}
        >
            {/* Your custom component with basic video conferencing functionality. */}
            <VideoConference chatMessageFormatter={formatChatMessageLinks} />
        </LiveKitRoom>
    );
}