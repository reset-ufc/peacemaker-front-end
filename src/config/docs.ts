interface DocsConfig {
  sidebarNav: {
    title: string;
    items: {
      title: string;
      href: string;
    }[];
  }[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/getting-started",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Features",
          href: "/docs/features",
        },
        {
          title: "API Reference",
          href: "/docs/api",
        },
        {
          title: "Examples",
          href: "/docs/examples",
        },
      ],
    },
  ],
};
