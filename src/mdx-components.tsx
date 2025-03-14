import type { MDXComponents } from "mdx/types";

import { Code } from "@/components/layout/mdx/code";
import { CustomLink } from "@/components/layout/mdx/custom-link";
import { Image } from "@/components/layout/mdx/image";
import { InlineCode } from "@/components/layout/mdx/inline-code";
import { Pre } from "@/components/layout/mdx/pre";
import { Button } from "@/components/ui/button";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Button: props => (
      <div className="pb-4">
        <Button {...props} className="" />
      </div>
    ),
    Image,
    pre: Pre,
    code: ({ className, children, ...rest }) => {
      if (className) {
        return (
          <Code className={className} {...rest}>
            {children}
          </Code>
        );
      }
      return <InlineCode>{children}</InlineCode>;
    },
    h1: props => <h1 className="w-full pb-4 text-4xl font-black" {...props} />,
    h2: props => <h2 className="w-full pb-4 text-3xl font-black" {...props} />,
    h3: props => <h3 className="w-full pb-4 text-2xl font-bold" {...props} />,
    h4: props => <h4 className="w-full pb-4 text-xl font-bold" {...props} />,
    h5: props => <h5 className="w-full pb-4 text-lg font-bold" {...props} />,
    h6: props => <h6 className="w-full pb-4 text-base font-light" {...props} />,
    p: props => <p className="mb-4 w-full text-xl sm:text-lg" {...props} />,
    li: props => <li className="" {...props} />,
    ul: props => <ul className="w-full list-disc pb-4 pl-6" {...props} />,
    ol: props => <ol className="w-full list-decimal pb-4 pl-6" {...props} />,
    hr: props => <hr className="w-full border-t pb-4" {...props} />,
    blockquote: props => (
      <blockquote
        style={{ paddingBottom: 0 }}
        className="my-4 border-l-4 pl-4"
        {...props}
      />
    ),
    a: ({ href = "", children, ...rest }) => {
      // Use the CustomLink component to handle external/internal links
      return (
        <CustomLink
          href={href}
          className="dark:text-primary text-primary decoration-primary hover:decoration-primary hover:underline"
          {...rest}
        >
          {children}
        </CustomLink>
      );
    },
    // table
    table: props => (
      <table
        className="w-full table-auto border-collapse border border-gray-300 text-left dark:border-gray-700"
        {...props}
      />
    ),
    thead: props => (
      <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
    ),
    tbody: props => <tbody className="bg-white dark:bg-gray-900" {...props} />,
    tr: props => (
      <tr className="even:bg-gray-50 dark:even:bg-gray-800" {...props} />
    ),
    th: props => (
      <th
        className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200"
        {...props}
      />
    ),
    td: props => (
      <td
        className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300"
        {...props}
      />
    ),
  };
}
