# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Use caching for deps
COPY package*.json ./

# Install dependencies with legacy peer deps to handle conflicts
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .

# Set environment variables for build
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV GENERATE_SOURCEMAP=false

# Create a production build with verbose output
RUN npm run build --verbose

# ---------- Runtime (Nginx) ----------
FROM nginx:1.27-alpine

# Copy custom nginx config (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (nginx default)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

