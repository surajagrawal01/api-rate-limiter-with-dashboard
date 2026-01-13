import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} RateLimiter. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
