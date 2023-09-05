import { PropsWithChildren } from "react";
import Link from "next/link";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className="container min-h-screen flex flex-col">
      <header className="py-8 text-center space-y-4">
        <Link href="/">
          <h1 className="text-primary text-4xl hover:text-primary/80 transition-all">
            Book tracker 📙
          </h1>
        </Link>
        <nav>
          <Link
            href="/reading-list"
            className="text-primary text-lg hover:text-primary/80 transition-all"
          >
            my reading list
          </Link>
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
