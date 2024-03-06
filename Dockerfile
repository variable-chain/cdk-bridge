# Use an official Node.js runtime as a parent image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# RUN chmod +x scripts/generate-contract-types.sh

# RUN npm run generate-contract-types

# Expose a port to communicate with the React app
# EXPOSE 5173

# Start your React app
CMD ["npm", "run", "dev"]


#CMD ['./scripts/generate-contract-types.sh']


