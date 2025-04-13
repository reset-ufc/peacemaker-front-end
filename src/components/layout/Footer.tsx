import { Link } from "react-router-dom";

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
    <footer className='border-t py-4 not-sm:px-4'>
      <div className='container mx-auto flex flex-col gap-8 pt-5'>
        <section className='grid w-fit grid-cols-1 gap-6 md:grid-cols-3'>
          {footerLinks.map(link => (
            <div key={link.title} className='flex flex-col gap-2'>
              <p className='text-xl font-semibold'>{link.title}</p>
              <div className='flex flex-col gap-1'>
                {link.items.map(item => (
                  <Link
                    key={item.title}
                    to={item.href}
                    title={item.title}
                    className='hover:underline'
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* <section className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-end">
            <p>PeaceMakerBot</p>
            <p className="flex gap-1">
              Powered by{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center gap-1 text-sm"
                title="Vercel - The platform for next.js"
              >
                <span className="border-b-foreground h-0 w-0 border-r-[10px] border-b-[15px] border-l-[10px] border-r-transparent border-l-transparent" />
                Vercel
              </a>
              and
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center text-sm"
              >
                <svg
                  viewBox="0 0 256 549"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                >
                  <title>MongoDb</title>
                  <path
                    fill="currentColor"
                    d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.704 26.234 5.966 63.988 5.966 63.988h17.045s4.26-37.54 5.965-63.987l1.918-1.494c.213.214 228.828-169.78 31.32-421.677Zm-47.726 418.05s-10.227-8.744-12.997-13.222v-.428l12.358-274.292c0-.853 1.279-.853 1.279 0l12.357 274.292v.428c-2.77 4.478-12.997 13.223-12.997 13.223Z"
                  />
                </svg>
                MongoDb
              </a>
            </p>
          </div>
        </section> */}
      </div>
    </footer>
  );
}
