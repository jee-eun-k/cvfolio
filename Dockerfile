FROM oven/bun:latest

WORKDIR /app

# Only copy package.json and bun.lockb for caching the source code.
# We will run 'bun install' manually on container start.
COPY package.json bun.lockb ./

# Copy the rest of your Astro project files into the container
COPY . .

# Expose the port Astro's dev server typically runs on (default is 4321)
EXPOSE 4321

# Define the default command to run your Astro development server
# (This will be overridden by our docker run command)
CMD ["bun", "run", "dev", "--host"]