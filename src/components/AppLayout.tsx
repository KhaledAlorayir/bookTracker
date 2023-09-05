import { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  console.log(router.pathname);
  const pages = [
    {
      title: "home",
      link: "/",
      isActive: router.pathname === "/",
    },
    {
      title: "my reading list",
      link: "/reading-list",
      isActive: router.pathname === "/reading-list",
    },
  ];

  return (
    <main className="container min-h-screen flex flex-col">
      <header className="py-8 text-center space-y-4">
        <Link href="/">
          <h1 className="text-primary text-4xl hover:text-primary/80 transition-all">
            Book tracker 📙
          </h1>
        </Link>
        <nav className="space-x-4">
          {pages.map((page) => (
            <Link
              key={page.link}
              href={page.link}
              className={cn(
                "text-lg hover:opacity-80 transition-all capitalize",
                page.isActive ? "text-primary " : "text-white"
              )}
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </header>
      <section className="flex-1">{children}</section>
      <footer className="py-2 text-center">
        <p>
          made by{" "}
          <Link
            className="text-primary hover:text-primary/80 transition-all"
            href="https://github.com/KhaledAlorayir"
            target="_blank"
          >
            khaled alorayir.
          </Link>
        </p>
      </footer>
    </main>
  );
}
