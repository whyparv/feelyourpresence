# Deployment Guide for Feel Your Presence

This guide covers deploying the application on Ubuntu EC2 with EasyPanel using Docker.

## Prerequisites

- Ubuntu EC2 instance (20.04 LTS or newer recommended)
- Docker and Docker Compose installed
- Domain name pointed to your EC2 instance (optional but recommended)
- EasyPanel installed on your server

## Quick Start

### 1. Install Dependencies on Ubuntu EC2

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add current user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker-compose --version
```

### 2. Clone Your Repository

```bash
git clone <your-repo-url>
cd feelyourpresence
```

### 3. Build and Run with Docker Compose

```bash
# Build the Docker image
docker-compose build

# Start the application
docker-compose up -d

# Check logs
docker-compose logs -f
```

The application will be available at `http://your-server-ip:3000`

### 4. Using EasyPanel

1. **Login to EasyPanel** dashboard on your server

2. **Create New Project**:
   - Click "New Project"
   - Choose "From GitHub" or "From GitLab"
   - Select your repository

3. **Configure Build Settings**:
   - Build Type: `Dockerfile`
   - Port: `3000`
   - Environment Variables: (if needed)
     ```
     NODE_ENV=production
     PORT=3000
     ```

4. **Add Volume** (Important for data persistence):
   - Click "Volumes"
   - Add volume mapping:
     - Source: `/app/public/data-exports`
     - Mount: `./data-exports` (persistent storage)

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

### 5. Configure Reverse Proxy (Nginx)

If not using EasyPanel's built-in proxy, set up Nginx:

```bash
sudo apt install nginx -y

# Create nginx config
sudo nano /etc/nginx/sites-available/feelyourpresence
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/feelyourpresence /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL Certificate (Optional but Recommended)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
```

## Accessing Subscriber Data

Subscriber data is publicly accessible at:

- **Subscribers List**: `https://your-domain.com/data-exports/subscribers-<hash>.txt`
- **Stats JSON**: `https://your-domain.com/data-exports/stats-<hash>.json`

To get the exact URLs, visit:
```bash
curl https://your-domain.com/api/subscribe
```

Or check the API response after the first subscription.

### Finding Your Data URL

The hash is generated from the string in the API route. You can find it by:

1. Making a GET request to `/api/subscribe`
2. Checking the API response after submitting an email
3. Looking in `public/data-exports/` directory

Example URLs:
```
https://your-domain.com/data-exports/subscribers-a1b2c3d4e5f6g7h8.txt
https://your-domain.com/data-exports/stats-a1b2c3d4e5f6g7h8.json
```

## Environment Variables

Create a `.env.production` file if needed:

```env
NODE_ENV=production
PORT=3000
```

## Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Monitoring

### View Logs
```bash
docker-compose logs -f
```

### Check Container Status
```bash
docker-compose ps
```

### Monitor Resources
```bash
docker stats
```

## Backup Subscriber Data

```bash
# Create backup script
cat > /usr/local/bin/backup-subscribers.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATA_DIR="/path/to/feelyourpresence/public/data-exports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
cp -r $DATA_DIR $BACKUP_DIR/data-exports-$TIMESTAMP

# Keep only last 30 backups
ls -t $BACKUP_DIR | tail -n +31 | xargs -I {} rm -rf $BACKUP_DIR/{}
EOF

chmod +x /usr/local/bin/backup-subscribers.sh

# Add to crontab (daily backup at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-subscribers.sh") | crontab -
```

## Troubleshooting

### Application won't start
```bash
# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Port already in use
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

### Permission issues with data directory
```bash
# Fix permissions
sudo chown -R $USER:$USER public/data-exports
chmod -R 755 public/data-exports
```

## Security Recommendations

1. **Firewall Setup**:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **Regular Updates**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. **Secure Data Directory**:
   - The data is intentionally public, but monitor access logs
   - Consider adding rate limiting if needed

## Support

For issues or questions:
- Check the logs: `docker-compose logs -f`
- Review the Dockerfile and docker-compose.yml
- Ensure all prerequisites are met
