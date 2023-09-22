"use client";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [name, setName] = useState<string>();
	const [room, setRoom] = useState<string>();
	const router = useRouter();
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<Card className="py-4">
				<CardHeader className="flex-col items-start px-4 pt-2 pb-0">
					<p className="font-bold uppercase text-tiny">Start a new meeting</p>
				</CardHeader>
				<CardBody className="overflow-visible">
					<form  onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
						<Input value={name} onChange={e => setName(e.target.value)} required placeholder="name" />
						<Input value={room} onChange={e => setRoom(e.target.value)} required placeholder="room" />
						<Button color="success" onClick={() => router.push(`/room?room=${room}&name=${name}`)}>Create</Button>
					</form>
				</CardBody>
			</Card>
		</section>
	);
}
