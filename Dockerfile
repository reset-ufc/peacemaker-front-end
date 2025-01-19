# syntax=docker.io/docker/dockerfile:1

ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

# Dependencies stage
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Builder stage with environment support
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NODE_ENV
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_VERCEL_REVALIDATE_TIME
ARG NEXT_PUBLIC_STATIC_EXPORT
ARG NEXT_PUBLIC_GITHUB_ID
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

ENV NODE_ENV=${NODE_ENV} \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL} \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_VERCEL_REVALIDATE_TIME=${NEXT_PUBLIC_VERCEL_REVALIDATE_TIME} \
    NEXT_PUBLIC_STATIC_EXPORT=${NEXT_PUBLIC_STATIC_EXPORT} \
    NEXT_PUBLIC_GITHUB_ID=${NEXT_PUBLIC_GITHUB_ID} \
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}

RUN corepack enable pnpm && pnpm run build

# Production stage
FROM base AS production

WORKDIR /app
ENV NODE_ENV=production \
    # Uncomment the following line in case you want to disable telemetry during runtime.
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Set the correct permission for prerender cache
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
