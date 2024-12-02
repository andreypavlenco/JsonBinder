FROM node:22.11.0-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN  npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22.11.0-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/src/main.js"]