# syntax=docker.io/docker/dockerfile:1

ARG NODE_VERSION=20.19.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
RUN corepack enable pnpm

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Builder stage with environment support
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BASE_URL
ARG BASE_API_URL
ARG VERCEL_REVALIDATE_TIME
ARG NEXT_PUBLIC_STATIC_EXPORT
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL} \
    BASE_API_URL=${BASE_API_URL} \
    VERCEL_REVALIDATE_TIME=${VERCEL_REVALIDATE_TIME} \
    NEXT_PUBLIC_STATIC_EXPORT=${NEXT_PUBLIC_STATIC_EXPORT} \
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build

# Production stage
FROM base AS production

WORKDIR /app
ENV NODE_ENV=production \
    # Uncomment the following line in case you want to disable telemetry during runtime.
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001 \
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
EXPOSE 3001
# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
