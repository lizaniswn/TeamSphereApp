# 1) Base image
FROM node:20-alpine AS base

# 2) Workdir
WORKDIR /app

# 3) Only copy manifest first (better caching)
COPY package*.json ./

# 4) Install production deps
RUN npm ci --omit=dev

# 5) Copy the rest
COPY . .

# 6) Environment & healthcheck (optional)
ENV NODE_ENV=production
# If your server listens on PORT env, keep this:
ENV PORT=5001

# 7) Expose and start
EXPOSE 5001
CMD ["node", "server.js"]
