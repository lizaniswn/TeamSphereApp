<!-- This file has been consolidated into github-actions-setup.md -->
<!-- Please delete this file and use github-actions-setup.md instead -->
## Prerequisites

### 1. Setup Self-Hosted Runner
```bash
# On your local machine, go to:
# GitHub Repository → Settings → Actions → Runners → New self-hosted runner

# Download and configure the runner
# Follow GitHub's setup instructions for your OS
# Make sure Docker and Docker Compose are installed on the runner
```

### 2. Configure GitHub Secrets
Go to: Repository Settings → Secrets and variables → Actions

Add these secrets:
```
DOCKER_USERNAME=your_dockerhub_username
DOCKER_PASSWORD=your_dockerhub_password_or_token
```

### 3. Prepare Local Environment
```bash
# Ensure Docker is running
docker --version
docker-compose --version

# Test your current setup
docker-compose up --build -d
docker-compose down
```

## How It Works

### Automatic Deployment (Push to main)
1. **Code Push** → Triggers workflow
2. **Build** → Creates Docker images
3. **Push** → Uploads to Docker Hub  
4. **Deploy** → Runs on your local machine
5. **Test** → Health checks verify deployment

### Manual Deployment (Any branch)
1. **GitHub Actions tab** → "Manual Local Deploy"
2. **Choose branch** and environment
3. **Run workflow** → Builds and deploys locally
4. **Monitor** → Check logs and status

## Usage Examples

### 1. Automatic Deploy
```bash
# Just push to main branch
git add .
git commit -m "Update feature"
git push origin main
# → Automatically deploys to local machine
```

### 2. Manual Deploy
1. Go to GitHub → Actions tab
2. Click "Manual Local Deploy"
3. Select branch (main/develop/feature-branch)
4. Click "Run workflow"
5. Monitor progress in Actions tab

### 3. Development Workflow
```bash
# Work on feature branch
git checkout -b feature/new-feature
git push origin feature/new-feature

# Deploy feature branch for testing
# → Use manual deploy with branch selection
```

## Monitoring Deployments

### Check Status Locally
```bash
# View running containers
docker ps

# Check logs
docker-compose logs -f

# Test application
curl http://localhost:5001/api/projects/health
curl http://localhost
```

### GitHub Actions Monitoring
- **Actions Tab** → View workflow runs
- **Real-time Logs** → Monitor deployment progress
- **Status Badges** → Quick deployment status

## Troubleshooting

### Common Issues
1. **Runner Offline** → Restart GitHub Actions runner
2. **Docker Issues** → Check Docker daemon status
3. **Port Conflicts** → Stop conflicting services
4. **Image Build Fails** → Check Dockerfile syntax

### Debug Commands
```bash
# Check runner status
./run.sh --check

# View detailed logs
docker-compose logs backend
docker-compose logs frontend

# Restart deployment
docker-compose restart
```

## File Structure
```
.github/
└── workflows/
    ├── build-and-deploy.yml    # Auto deploy on push
    └── local-deploy.yml        # Manual deploy
```

## Benefits
- ✅ **Automated** builds and deployments
- ✅ **Branch-specific** deployments  
- ✅ **Health checks** ensure reliability
- ✅ **Docker Hub** integration for image management
- ✅ **Local testing** before production
- ✅ **Easy rollbacks** with branch selection
