import type { NextConfig } from "next";

import createMDX from "@next/mdx";
import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

import { ENABLE_STATIC_EXPORT } from "./next.constants.mjs";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Carrega variáveis de ambiente do arquivo `env.mjs`
jiti.import("./src/env.mjs");

// Tenta importar um arquivo de configuração do usuário, se existir
let userConfig;
try {
  userConfig = jiti("./v0-user-next.config");
} catch (e) {
  console.warn("Nenhuma configuração de usuário encontrada.");
}

const nextConfig: NextConfig = {
  // Configure `pageExtensions` para incluir arquivos markdown e MDX
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Apenas para garantir que o React esteja sempre no modo estrito
  reactStrictMode: true,

  // Não usamos barras finais nas URLs do site
  trailingSlash: false,

  // Evita redirecionamentos desnecessários com barras finais
  skipTrailingSlashRedirect: true,

  // Não queremos executar a verificação de tipos no build de produção
  // pois já verificamos no CI dentro de cada Pull Request
  typescript: { ignoreBuildErrors: true },

  // Não queremos executar a verificação do ESLint no build de produção
  // pois já verificamos no CI dentro de cada Pull Request
  // Também configuramos o ESLint para rodar a verificação em todos os arquivos (next lint)
  eslint: { dirs: ["."], ignoreDuringBuilds: true },

  experimental: {
    // Lista de pacotes que o Next.js deve otimizar automaticamente
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: ["tailwindcss"],

    // Melhorias de build paralelo no Webpack para otimização de desempenho
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  transpilePackages: ["@t3-oss/env-nextjs"],

  // Em builds de exportação estática, ativamos esse recurso
  output: ENABLE_STATIC_EXPORT ? "export" : "standalone",

  logging: {
    incomingRequests: true,
    fetches: {
      fullUrl: true,
    },
  },

  // Em exportações estáticas, desativamos a otimização de imagens
  images: {
    unoptimized: ENABLE_STATIC_EXPORT,
  },
};

// Função para mesclar configurações adicionais do usuário
function mergeConfig(baseConfig: NextConfig, extraConfig: any) {
  if (!extraConfig) return baseConfig;

  for (const key in extraConfig) {
    if (
      typeof baseConfig[key] === "object" &&
      !Array.isArray(baseConfig[key])
    ) {
      baseConfig[key] = {
        ...baseConfig[key],
        ...extraConfig[key],
      };
    } else {
      baseConfig[key] = extraConfig[key];
    }
  }
  return baseConfig;
}

// Aplica configurações extras do usuário, se existirem
const finalConfig = mergeConfig(nextConfig, userConfig);

const withMDX = createMDX({
  options: {
    format: "mdx",
  },
});

// Mescla a configuração do MDX com a configuração final do Next.js
export default withMDX(finalConfig);
