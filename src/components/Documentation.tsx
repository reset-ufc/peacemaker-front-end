import { MDXProvider } from '@mdx-js/react';
import React from 'react';

interface DocumentationProps {
  children: React.ReactNode;
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-3" {...props} />,
  p: (props: any) => <p className="mb-4" {...props} />,
  code: (props: any) => <code className="bg-gray-900 p-1 rounded" {...props} />,
  pre: (props: any) => <pre className="bg-neutral-900 p-4 rounded mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc ml-6 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal ml-6 mb-4" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
};

export function Documentation({ children }: DocumentationProps) {
  return (
    <MDXProvider components={components}>
      <div className="prose max-w-none p-8">
        {children}
      </div>
    </MDXProvider>
  );
} 