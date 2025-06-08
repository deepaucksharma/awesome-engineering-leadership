#!/bin/bash

echo "🚀 System Design Course - Setup Script"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo ""
echo "📁 Creating directories..."
mkdir -p src/components/simulations
mkdir -p src/components/visualizers
mkdir -p src/app/case-studies
mkdir -p content/fundamentals
mkdir -p content/case-studies
mkdir -p content/workshops
mkdir -p public/assets
mkdir -p public/data

# Build the project
echo ""
echo "🔨 Building project..."
npm run build

# Success message
echo ""
echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "To deploy to GitHub Pages:"
echo "  npm run deploy"
echo ""
echo "Happy coding! 🎉"
