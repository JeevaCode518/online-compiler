# Start from Node.js Alpine (small & fast)
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install Java, Python, C++ compiler, and tools
RUN apk update && apk add --no-cache \
    openjdk21 \
    python3 \
    py3-pip \
    g++ \
    make \
    bash

# Copy package.json first for caching
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose API port
EXPOSE 8000

# Start the Node app
CMD ["node", "index.js"]
