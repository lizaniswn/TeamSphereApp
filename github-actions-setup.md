# GitHub Actions Automatic Local Deployment Setup

## Environment Variables Explanation

The workflow uses these environment variables:
```yaml
env:
  REGISTRY: docker.io
  BACKEND_IMAGE: ${{ secrets.DOCKER_USERNAME }}/teamsphere-backend
  FRONTEND_IMAGE: ${{ secrets.DOCKER_USERNAME }}/teamsphere-frontend
```

### What they do:
- **REGISTRY**: Docker registry (Docker Hub)
- **BACKEND_IMAGE**: Your backend image name on Docker Hub (aaira1902/teamsphere-backend)
- **FRONTEND_IMAGE**: Your frontend image name on Docker Hub (aaira1902/teamsphere-frontend)
- **secrets.DOCKER_USERNAME**: Your Docker Hub username (aaira1902) stored securely

## Complete Setup Steps

### 1. Create GitHub Repository
```bash
cd C:\Users\SupravaSwain\TeamSphereApp
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/teamsphere.git
git push -u origin main
```

### 2. Setup Docker Hub Account
✅ **Already configured with username: aaira1902**
1. Verify repositories exist:
   - `aaira1902/teamsphere-backend`
   - `aaira1902/teamsphere-frontend`

### 3. Configure GitHub Secrets
Go to: Repository → Settings → Secrets and variables → Actions

Add these secrets:
```
DOCKER_USERNAME = aaira1902
DOCKER_PASSWORD = your_docker_hub_password_or_token
```

### 4. Setup Self-Hosted Runner
On your local machine:
1. Go to: Repository → Settings → Actions → Runners
2. Click "New self-hosted runner"
3. Follow setup instructions for Windows
4. Start the runner service

### 5. Workflow Files Overview

#### Main Workflow (build-and-deploy.yml)
- **Triggers**: Push to main/develop branches
- **Actions**: Build → Push to Docker Hub → Deploy locally
- **Runs on**: Ubuntu (build) + Self-hosted (deploy)

#### Manual Workflow (local-deploy.yml)
- **Triggers**: Manual dispatch from Actions tab
- **Actions**: Deploy any branch/version
- **Runs on**: Self-hosted runner

#### Manual Workflow (manual-deploy.yml)
- **Triggers**: Manual version selection
- **Actions**: Deploy specific image versions
- **Runs on**: Self-hosted runner

### 6. Usage Examples

#### Automatic Deployment
```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main
# → Automatically triggers build and deployment
```

#### Manual Deployment
1. Go to GitHub → Actions tab
2. Select "Manual Deploy to Local" or "Manual Local Deploy"
3. Choose branch/version and environment
4. Click "Run workflow"

### 7. Local Testing Commands

After deployment completes:
```bash
# Check if containers are running
docker ps

# Test the application
curl http://localhost:5001/api/projects/health
# Should return: {"status":"OK","message":"Projects API is running",...}

# Open browser
start http://localhost
```

### 8. Troubleshooting

#### Runner Issues
- Check GitHub → Settings → Actions → Runners
- Status should show "Idle" when ready
- Restart runner service if needed

#### Build Failures
- Check GitHub Actions logs
- Common issues:
  - Docker Hub login fails → Check secrets
  - Build fails → Check Dockerfile syntax
  - Deploy fails → Check runner is online

#### Local Access Issues
```bash
# Check containers and logs
docker-compose ps
docker-compose logs backend
docker-compose logs frontend

# Restart if needed
docker-compose restart
```

## Code Configuration

### Your Current Setup ✅
- **Docker Username**: aaira1902 (configured in .env)
- **Backend Image**: aaira1902/teamsphere-backend
- **Frontend Image**: aaira1902/teamsphere-frontend
- **Environment**: Ready for GitHub Actions

### No Code Changes Required
- React components use relative API paths
- Backend controllers work with any deployment
- Dockerfile configurations are optimized
- Environment variables are correctly configured

### Workflow Modes
- **Development**: `docker-compose up --build` (builds locally)
- **Production**: Uses pre-built images from Docker Hub

## File Structure
```
TeamSphereApp/
├── .github/
│   └── workflows/
│       ├── build-and-deploy.yml    # Auto deploy on push
│       ├── local-deploy.yml        # Manual branch deploy
│       └── manual-deploy.yml       # Manual version deploy
├── teamsphere-backend/
├── teamsphere-frontend/
├── docker-compose.yml
├── .env                           # Contains aaira1902 config
└── github-actions-setup.md        # This file
```

## Next Steps
1. **Push code to GitHub repository**
2. **Add Docker Hub secrets to GitHub**
3. **Setup self-hosted runner**
4. **Test by pushing to main branch**

## Benefits
- ✅ **Push to deploy** - Automatic deployment on code push
- ✅ **Docker Hub** - Images stored as aaira1902/teamsphere-*
- ✅ **Health checks** - Verifies deployment success
- ✅ **Local testing** - Runs on your development machine
- ✅ **Branch support** - Deploy different branches
- ✅ **Version control** - Rollback to previous versions
- ✅ **Rollback** - Easy to revert to previous versions
