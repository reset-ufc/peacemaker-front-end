import Link from "next/link";

const footerLinks = [
  {
    title: "Legal",
    items: [
      { title: "Use Terms", href: "/terms" },
      { title: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="container flex flex-col gap-8 pt-5">
        <section className="grid w-fit grid-cols-1 gap-6 md:grid-cols-3">
          {footerLinks.map(link => (
            <div key={link.title} className="flex flex-col gap-2">
              <p className="text-xl font-semibold">{link.title}</p>
              <div className="flex flex-col gap-1">
                {link.items.map(item => (
                  <Link
                    key={item.title}
                    href={item.href}
                    title={item.title}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          {/* logo */}
          {/* <Link href="/" title="procuraqui">
            <PeaceMakerBotLogo className="h-auto w-44" />
          </Link> */}

          {/* infos */}
          <div className="flex flex-col items-center gap-1 md:items-end">
            <p>PeaceMakerBOT</p>
            {/* Vercel Triangle */}
            <a
              href="https://vercel.com"
              target="_blank"
              className="flex flex-row items-center gap-2 text-sm"
              title="Vercel - The platform for next.js"
              rel="noreferrer"
            >
              Made with
              <span className="h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-foreground border-l-transparent border-r-transparent" />
              vercel
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}
