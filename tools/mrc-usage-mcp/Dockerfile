# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package.json package-lock.json* ./

# Copy tsconfig.json and the source code BEFORE running npm ci.
# This ensures that when "npm ci" triggers the "prepare" script (which runs "npm run build"),
# tsc has access to the necessary configuration and source files.
COPY tsconfig.json ./
COPY src ./src/

# Install project dependencies.
# Using ci for reproducible builds.
# This will install ALL dependencies (including devDependencies) first.
RUN npm ci

# Now that dependencies (including typescript) are installed and source files are present,
# explicitly run the build script.
RUN npm run build

# After build, prune dev dependencies to keep the production image lean.
RUN npm prune --production

# New stage for a smaller production image
FROM node:20-alpine

WORKDIR /app

# Copy built artifacts and production dependencies from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# The server listens on stdio, so no EXPOSE needed

# Command to run the MCP server
# This corresponds to the "bin" field in package.json: "./build/index.js"
CMD ["node", "./build/index.js"]
