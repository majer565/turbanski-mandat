FROM node:20-alpine AS builder
WORKDIR /app

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

COPY --from=builder /app/package*.json .
COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start:migrate"]