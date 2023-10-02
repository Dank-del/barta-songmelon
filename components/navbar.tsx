"use client";

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import {LogIn, LogOut} from 'lucide-react';
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import {signIn, signOut, useSession} from "next-auth/react";
import {Avatar} from "@nextui-org/avatar";

export const Navbar = () => {
	const { status, data } = useSession();
	return (
		<NextUINavbar maxWidth="xl" position="static">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex items-center justify-start gap-1" href="/">
						<p className="mr-2 text-3xl font-bold text-red-600 text-inherit">বার্তা</p>
						<p className="text-2xl font-semibold text-inherit">সম্মেলন</p>
					</NextLink>
				</NavbarBrand>
				<ul className="justify-start hidden gap-4 ml-2 lg:flex">
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden gap-2 sm:flex">
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					{status === "authenticated" ? <>
						<Button
							className="text-sm font-normal text-default-600 bg-default-100"
							startContent={<LogOut className="text-danger" />}
							endContent={<Avatar className="m-2" size="sm" isBordered color="danger" src={data?.user?.image!} />}
							variant="flat"
							onClick={() => signOut()}
						>
							Log Out ({data?.user?.name})
						</Button>
					</> : <Button
						className="text-sm font-normal text-default-600 bg-default-100"
						startContent={<LogIn className="text-success" />}
						variant="flat"
						onClick={() => signIn('google')}
					>
						Log In
					</Button>}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>
			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
						<NavbarMenuItem >
							{status === "authenticated" ? <>
								<Button
									className="text-sm font-normal text-default-600 bg-default-100"
									startContent={<LogOut className="text-danger" />}
									endContent={<Avatar className="m-2" size="sm" isBordered color="danger" src={data?.user?.image!} />}
									variant="flat"
									onClick={() => signOut()}
								>
									Log Out ({data?.user?.name})
								</Button>
							</> : <Button
								className="text-sm font-normal text-default-600 bg-default-100"
								startContent={<LogIn className="text-success" />}
								variant="flat"
								onClick={() => signIn('google')}
							>
								Log In
							</Button>}
						</NavbarMenuItem>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
