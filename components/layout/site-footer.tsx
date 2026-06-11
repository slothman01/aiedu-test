import Link from "next/link";
import Image from "next/image";
import { AIEDU, STUDIO } from "@/lib/brand";

const footerLinks = [
  { label: "About aiEDU", href: AIEDU.links.about },
  { label: "Educator Resources", href: AIEDU.links.educators },
  { label: "Curricular Resources", href: AIEDU.links.resources },
  { label: "Donate", href: AIEDU.links.donate },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--navy)] bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <Image
              src={AIEDU.logoUrl}
              alt={AIEDU.name}
              width={140}
              height={48}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              {AIEDU.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--teal)]">
              Explore aiEDU
            </h2>
            <ul className="mt-4 space-y-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 underline-offset-2 transition-colors hover:text-[var(--teal)] hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--teal)]">
              About this prototype
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {STUDIO.name} is an independent CMS prototype built to demonstrate
              how aiEDU could replace its static resource portal with a searchable
              catalog and admin workflow. Not an official aiEDU product.
            </p>
            <Link href="/process" className="btn-aiedu-pink mt-4 inline-flex text-sm">
              View build process <span className="cta-arrow ml-1">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {AIEDU.name} branding reference ·{" "}
            {STUDIO.name} demo
          </p>
          <a
            href={AIEDU.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--teal)]"
          >
            www.aiedu.org
          </a>
        </div>
      </div>
    </footer>
  );
}
