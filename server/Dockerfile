# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Node.js server code to the working directory
COPY . .

# Expose the port that the API server will run on
EXPOSE 3000

# Command to run the server when the container starts
CMD ["npm", "start"]
