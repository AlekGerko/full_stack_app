# Use Node.js v20 base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package files first (to optimize caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app files
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm", "start"]