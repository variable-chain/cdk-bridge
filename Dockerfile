# Use an official Node.js runtime as a parent image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# Copy the rest of your application code to the working directory
COPY . .

# Install app dependencies
RUN npm install

EXPOSE 5173

# Start your React app
CMD ["npm", "run", "dev"]
