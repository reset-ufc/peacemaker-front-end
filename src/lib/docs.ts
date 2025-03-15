// This is a placeholder for the actual content layer integration
// In a real project, you would use contentlayer or a similar tool

export type Doc = {
  title: string;
  description: string;
  slug: string;
  slugAsParams: string;
  body: {
    code: string;
  };
  prev?: {
    title: string;
    href: string;
  };
  next?: {
    title: string;
    href: string;
  };
};

export const allDocs: Doc[] = [
  {
    title: "Getting Started",
    description: "Learn how to get started with our documentation.",
    slug: "getting-started",
    slugAsParams: "getting-started",
    body: {
      code: `
# Getting Started

Welcome to our documentation! This guide will help you get started with our product.

## Installation

\`\`\`bash
npm install my-package
\`\`\`

## Basic Usage

\`\`\`jsx
import { MyComponent } from 'my-package'

function App() {
  return <MyComponent />
}
\`\`\`
      `,
    },
    next: {
      title: "Features",
      href: "/docs/features",
    },
  },
  {
    title: "Features",
    description: "Explore the features of our product.",
    slug: "features",
    slugAsParams: "features",
    body: {
      code: `
# Features

Our product comes with a variety of features to help you build amazing applications.

## Feature 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Feature 2

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      `,
    },
    prev: {
      title: "Getting Started",
      href: "/docs/getting-started",
    },
    next: {
      title: "API Reference",
      href: "/docs/api",
    },
  },
  {
    title: "API Reference",
    description: "Detailed API documentation for developers.",
    slug: "api",
    slugAsParams: "api",
    body: {
      code: `
# API Reference

This section provides detailed information about our API endpoints.

## Authentication

All API requests require authentication using an API key.

\`\`\`typescript
// Example API request with authentication
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`
  }
})
\`\`\`

## Endpoints

### GET /users

Retrieve a list of users.

### POST /users

Create a new user.
      `,
    },
    prev: {
      title: "Features",
      href: "/docs/features",
    },
  },
];
