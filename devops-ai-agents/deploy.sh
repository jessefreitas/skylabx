#!/bin/bash
# Deploy script for SkyLabX DevOps AI Agents

set -e  # Exit on error

echo "🚀 Starting deployment for DevOps AI Agents..."

# Navigate to project directory
PROJECT_DIR="/root/devops-ai-agents"
cd "$PROJECT_DIR" || { echo "❌ Failed to navigate to $PROJECT_DIR"; exit 1; }

# Pull latest changes from git
echo "📥 Pulling latest changes from GitHub..."
git pull origin main || { echo "❌ Git pull failed"; exit 1; }

# Stop running containers
echo "⏸️  Stopping containers..."
docker-compose down

# Rebuild and start containers
echo "🔨 Rebuilding and starting containers..."
docker-compose up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🗄️  Running Prisma migrations..."
docker-compose exec -T app npx prisma migrate deploy || echo "⚠️  Migration warning (might be first run)"

# Generate Prisma Client (if needed)
echo "🔧 Generating Prisma Client..."
docker-compose exec -T app npx prisma generate || echo "✓ Prisma Client already generated"

# Check container status
echo "✅ Checking container status..."
docker-compose ps

# Show logs (last 20 lines)
echo "📋 Recent logs:"
docker-compose logs --tail=20 app

echo ""
echo "🎉 Deployment complete!"
echo "📍 Access: https://skylabx.omniforge.com.br"
echo "📊 Check logs: docker-compose logs -f app"
echo "🔍 Check status: docker-compose ps"
