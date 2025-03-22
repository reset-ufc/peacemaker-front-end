# syntax=docker.io/docker/dockerfile:1

ARG NODE_VERSION=20.19.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
RUN corepack enable pnpm

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Builder stage with environment support
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_PUBLIC_BASE_URL
ARG BASE_API_URL
ARG VERCEL_REVALIDATE_TIME
ARG VITE_PUBLIC_STATIC_EXPORT
ARG VITE_PUBLIC_GOOGLE_ANALYTICS_ID

ENV VITE_PUBLIC_BASE_URL=${VITE_PUBLIC_BASE_URL} \
  BASE_API_URL=${BASE_API_URL} \
  VERCEL_REVALIDATE_TIME=${VERCEL_REVALIDATE_TIME} \
  VITE_PUBLIC_STATIC_EXPORT=${VITE_PUBLIC_STATIC_EXPORT} \
  VITE_PUBLIC_GOOGLE_ANALYTICS_ID=${VITE_PUBLIC_GOOGLE_ANALYTICS_ID}

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build

# Production stage
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

# Copy built files from builder stage
COPY --from=builder /app/dist .

# Copy Nginx configuration file
COPY ./nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
