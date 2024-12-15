# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the Vite development port
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
