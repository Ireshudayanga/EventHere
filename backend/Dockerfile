# Use official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 5000

# Install nodemon globally
RUN npm install -g nodemon

# Start the application using nodemon
CMD ["nodemon", "--legacy-watch", "server.js"]
