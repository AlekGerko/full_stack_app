# Stage 1: Build the app
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine

# Copy build artifacts from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Remove default config and add custom config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]