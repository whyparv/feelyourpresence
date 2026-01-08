# Feel Your Presence

A beautiful coming soon page with email subscription functionality and animated sparkles effect.

## Features

- 🎨 Beautiful design with custom brand colors (Ivory, Deep Blue, Gold)
- ✨ Animated sparkles text effect using Framer Motion
- 📧 Email subscription with form validation
- 💾 Public subscriber data export
- 🐳 Docker-ready for easy deployment
- 🚀 Optimized for production with Next.js 16

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## Brand Colors

The application uses the following brand colors:

- **Ivory** (`#f2ede0`) - Background
- **Deep Blue** (`#0b1c2d`) - Primary
- **Gold** (`#c9a24d`) - Secondary/Accent

## Subscriber Data Access

Subscriber emails are saved to a publicly accessible file with a unique hash:

### Get Data URLs

**API Endpoint**: `GET /api/subscribe`

```bash
curl https://your-domain.com/api/subscribe
```

**Response**:
```json
{
  "subscribersUrl": "/data-exports/subscribers-a1b2c3d4e5f6g7h8.txt",
  "statsUrl": "/data-exports/stats-a1b2c3d4e5f6g7h8.json"
}
```

### Access Data Files

- **Subscribers List**: `https://your-domain.com/data-exports/subscribers-<hash>.txt`
  - Format: `email | timestamp`
  - Example: `user@example.com | 2024-01-08T12:34:56.789Z`

- **Stats JSON**: `https://your-domain.com/data-exports/stats-<hash>.json`
  - Contains: Total subscribers count, last updated timestamp, public URL

### Security Note

The subscriber data URL uses a SHA-256 hash to provide some obscurity, but the files are intentionally public. To change the URL hash, modify the string in `/src/app/api/subscribe/route.ts`:

```typescript
const PUBLIC_DATA_HASH = crypto
  .createHash("sha256")
  .update("your-new-secret-string-here") // Change this
  .digest("hex")
  .substring(0, 16);
```

## Project Structure

```
feelyourpresence/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── subscribe/
│   │   │       └── route.ts          # Email subscription API
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home/Coming soon page
│   ├── components/
│   │   └── ui/
│   │       └── sparkles-text.tsx     # Animated sparkles component
│   └── lib/
│       └── utils.ts                  # Utility functions
├── public/
│   ├── data-exports/                 # Public subscriber data
│   │   ├── subscribers-<hash>.txt
│   │   └── stats-<hash>.json
│   └── logo.png                      # App logo
├── Dockerfile                        # Docker configuration
├── docker-compose.yml                # Docker Compose setup
├── DEPLOYMENT.md                     # Deployment guide
└── next.config.ts                    # Next.js configuration
```

## Deployment

For detailed deployment instructions on Ubuntu EC2 with EasyPanel, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Docker Deployment

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### EasyPanel Deployment

1. Create new project from GitHub
2. Set build type to `Dockerfile`
3. Set port to `3000`
4. Add volume for `/app/public/data-exports`
5. Deploy

## Environment Variables

No environment variables required for basic operation. Optional:

```env
NODE_ENV=production
PORT=3000
```

## API Endpoints

### POST `/api/subscribe`

Subscribe a new email address.

**Request**:
```json
{
  "email": "user@example.com"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Successfully subscribed!",
  "dataUrl": "/data-exports/subscribers-<hash>.txt"
}
```

**Error Responses**:
- `400`: Invalid email format
- `409`: Email already subscribed
- `500`: Server error

### GET `/api/subscribe`

Get public data URLs.

**Response** (200):
```json
{
  "subscribersUrl": "/data-exports/subscribers-<hash>.txt",
  "statsUrl": "/data-exports/stats-<hash>.json"
}
```

## Development

### Component Structure

The main page ([src/app/page.tsx](src/app/page.tsx)) includes:
- Logo display
- Animated "Coming Soon" heading with SparklesText
- Email subscription form with animations
- Success/error feedback
- Decorative background elements

### Adding New Features

1. Components go in `src/components/`
2. UI components from shadcn go in `src/components/ui/`
3. API routes go in `src/app/api/`
4. Update brand colors in `src/app/page.tsx` (lines 10-14)

## Troubleshooting

### Build Issues

```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Permission Issues (Development)

If you encounter permission errors with `/src/lib/`:
```bash
sudo chown -R $USER:$USER src/lib/
```

### Docker Issues

```bash
# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

## License

Private project for Feel Your Presence.

## Support

For deployment issues, refer to [DEPLOYMENT.md](DEPLOYMENT.md).
