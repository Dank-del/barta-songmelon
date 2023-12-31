import "@/styles/globals.css";
import {Metadata} from "next";
import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";
import {Providers} from "./providers";
import {Navbar} from "@/components/navbar";
import {Link} from "@nextui-org/link";
import clsx from "clsx";
import React from "react";
import {NextAuthProvider} from "@/app/provider";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({children}: { children: React.ReactNode; }) {
    return (
        <NextAuthProvider>
            <html lang="en" suppressHydrationWarning>
            <head/>
            <body
                className={clsx(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
            <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
                <div className="relative flex flex-col h-screen">
                    <Navbar/>
                    <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
                        {children}
                    </main>
                    <footer className="flex items-center justify-center w-full py-3">
                        <Link
                            isExternal
                            className="flex items-center gap-1 text-current"
                            href="https://barta.company"
                            title="barta homepage"
                        >
                            <span className="text-default-600">Powered by</span>
                            <p className="text-red-600">Barta</p>
                        </Link>
                    </footer>
                </div>
            </Providers>
            </body>
            </html>
        </NextAuthProvider>
    );
}
