# ----------------------
# 1️⃣ Install Dependencies
# ----------------------
    FROM node:22-alpine AS deps

    RUN apk add --no-cache libc6-compat
    
    WORKDIR /app
    COPY package.json yarn.lock ./
    
    RUN yarn install --frozen-lockfile --legacy-peer-deps --network-timeout 300000
    
    # ----------------------
    # 2️⃣ Build the Application
    # ----------------------
    FROM node:22-alpine AS builder
    WORKDIR /app
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    COPY docker/middleware.js ./src
    
    ARG DATABASE_TYPE
    ARG BASE_PATH
    
    ENV DATABASE_TYPE="$DATABASE_TYPE"
    ENV BASE_PATH="$BASE_PATH"
    ENV NEXT_TELEMETRY_DISABLED=1
    
    RUN yarn prisma generate  # Ensure Prisma is built
    RUN yarn build-docker
    
    # ----------------------
    # 3️⃣ Create the Final Production Image
    # ----------------------
    FROM node:22-alpine AS runner
    WORKDIR /app
    
    ARG NODE_OPTIONS
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV NODE_OPTIONS="$NODE_OPTIONS"
    
    # Add user and permissions
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    
    # Install only necessary production dependencies
    RUN set -x \
        && apk add --no-cache curl \
        && yarn add npm-run-all dotenv semver
    
    # Copy essential build files
    COPY --from=builder --chown=nextjs:nodejs /app/next.config.js .
    COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
    COPY --from=builder --chown=nextjs:nodejs /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
    COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
    
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    USER nextjs
    
    EXPOSE 3000
    
    ENV HOSTNAME=0.0.0.0
    ENV PORT=3000
    
    CMD ["yarn", "start-docker"]
    