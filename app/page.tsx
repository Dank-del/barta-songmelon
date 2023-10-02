"use client";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { Avatar } from "@nextui-org/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"
import short from 'short-uuid';

type Inputs = {
    roomId: string;
}

export default function Home() {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()
    const router = useRouter();
    const onSubmit: SubmitHandler<Inputs> = (d) => router.push(`/room?id=${d.roomId}`)
    const { data, status } = useSession();
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="hero-section">
                <h1>বার্তা সম্মেলন</h1>
                <p>বিনামূল্যের ভিডিও কনফারেন্সিং অ্যাপ</p>

                <div className="login-buttons">
                    {status === "authenticated" ? <>
                        <Button
                            className="text-sm font-normal text-default-600 bg-default-100"
                            startContent={<LogOut className="text-danger" />}
                            endContent={<Avatar className="m-2" size="sm" isBordered color="danger" src={data?.user?.image!} />}
                            variant="flat"
                            size="lg"
                            onClick={() => signOut()}
                        >
                            Logged in as {data?.user?.name}
                            <br />
                            Tap to Log out
                        </Button>
                    </> : <Button
                        className="text-sm font-normal text-default-600 bg-default-100"
                        startContent={<LogIn className="text-success" />}
                        variant="flat"
                        onClick={() => signIn('google')}
                    >
                        Log In
                    </Button>}
                </div>

                <div className="meeting-code-input">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            {...register("roomId", {
                                required: true
                            })}
                            type="text"
                            required
                            placeholder="সভা কোড লিখুন"
                            className="meeting-code-input"
                        />
                        <Button type="submit" className="m-1" color="danger" variant="bordered">সভাটিতে যোগ দিন</Button>
                    </form>
                    <Button
                        className="m-1"
                        color="success"
                        variant="bordered"
                        onPress={() => router.push(`/room?id=${short.generate()}`)}
                    >
                        নতুন মিটিং তৈরি করুন
                    </Button>
                </div>
            </div>
        </div>
    );
}
