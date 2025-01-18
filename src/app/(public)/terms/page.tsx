import type { Metadata } from "next";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = "force-static";

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export function generateMetadata(): Metadata {
  return {
    title: "Terms",
  };
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 py-14">
      <div className="mx-auto px-14">
        <h1 className="text-7xl font-extrabold">Terms of use</h1>
      </div>

      <section className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Lorem ipsum</h2>
          <p className="text-balance text-base leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
            tenetur tempore reprehenderit quos natus hic debitis, laboriosam
            neque fugiat, provident voluptates temporibus dicta, quisquam in
            deserunt perferendis quidem cumque mollitia. Corporis pariatur rerum
            sunt earum eligendi nobis laudantium voluptatum obcaecati ab totam
            quibusdam tenetur sit vitae doloremque dicta atque perspiciatis
            error distinctio, tempore rem excepturi adipisci! Provident vel
            incidunt earum. Cumque, repudiandae ipsam? Eveniet dolorem ullam
            vero, totam ad fugit culpa praesentium magnam ex a nostrum quidem
            omnis ipsa officia corporis. Provident eum voluptatem assumenda
            dicta, sunt aliquam fuga tempore. Eveniet harum voluptas, eos
            doloribus distinctio quasi accusamus quod sed expedita optio est quo
            corrupti illo modi praesentium quis molestiae. Sequi possimus
            dolorem cupiditate assumenda ea deleniti? Culpa, cumque sequi! Eum
            rerum ullam reiciendis dicta ratione officiis neque maxime alias
            porro ab a, dolorum atque dolorem facere similique voluptate ex
            tempora reprehenderit repellendus cupiditate eaque mollitia ipsum!
          </p>
        </div>
      </section>
    </main>
  );
}
