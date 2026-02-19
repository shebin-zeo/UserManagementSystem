# ---------- Stage 1: Build ----------
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# 🔥 Increase memory for Angular build
ENV NODE_OPTIONS=--max-old-space-size=1024

COPY . .
RUN npm run build -- --configuration production



# ---------- Stage 2: Run SSR ----------
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 4000

CMD ["node", "dist/demo/server/server.mjs"]