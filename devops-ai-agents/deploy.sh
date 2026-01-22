#!/bin/bash
# Deploy script for SkyLabX DevOps AI Agents

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /root/devops-ai-agents || exit 1

# Stop the container
echo "⏸️  Stopping container..."
docker-compose down

# Pull latest changes (if using git)
# git pull origin main

# Rebuild and restart
echo "🔨 Rebuilding container..."
docker-compose up -d --build

# Check status
echo "✅ Checking container status..."
docker-compose ps

echo "🎉 Deployment complete!"
echo "Access: https://skylabx.omniforge.com.br"
