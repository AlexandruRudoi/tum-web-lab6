# syntax=docker/dockerfile:1.6

# ----------------------------------------------------------------------------
# Stage 1 — build the Vite app
# ----------------------------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Build mode is informational; we DO NOT set NODE_ENV=production before
# `npm ci`, otherwise npm would skip devDependencies (vite, @vitejs/plugin-react)
# and the build would fail.
ARG MODE=production
ENV VITE_MODE=$MODE

COPY package.json package-lock.json* ./
RUN npm ci --silent

COPY . .

RUN npm run build

# ----------------------------------------------------------------------------
# Stage 2 — serve via nginx
# ----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Drop default site + add our config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
