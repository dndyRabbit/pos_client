import Link from "next/link";

export function Footer() {
  return (
    <footer className="sticky bot-0 z-20 h-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          copyright © 2024 {" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            rabbitdev.com {" "}
          </Link>
          created by <strong className="font-bold">Dendy Haidar Rinaldi.</strong>
        </p>
      </div>
    </footer>
  );
}
