#!/bin/bash

echo "🚀 Starting CVfolio development server..."
echo "📁 Working directory: $(pwd)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
fi

# Start development server
echo "🔥 Starting dev server..."
bun dev