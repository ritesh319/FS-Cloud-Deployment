# -------------------------------
# 🏗️ STAGE 1: Build React app
# -------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Build the React app (creates /app/build folder)
RUN npm run build

# -------------------------------
# 🚀 STAGE 2: Run using Nginx
# -------------------------------
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 so we can access it
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
