"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className="flex gap-x-2 border">
      <Link href="/movies">movies {path.includes("movies") ? "🎉" : ""}</Link>
      <Link href="/">home {path === "/" ? "🎉" : ""}</Link>
    </nav>
  );
}
