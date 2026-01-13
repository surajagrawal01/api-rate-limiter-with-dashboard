"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    Rate Limiter
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/plans" className="text-sm text-muted-foreground hover:text-foreground">
                        Plans
                    </Link>
                </nav>
            </div>
        </header>
    );
}
