# לומדים אותיות בעיברית אנגלית ומספרים — React Native / Expo

Hebrew letters, English letters & Hebrew numbers learning game with voice.

## One-time setup (do this once, then every push auto-deploys to TestFlight)

### 1. Install deps & generate placeholder assets
```bash
npm install
node scripts/gen-assets.js
```

### 2. Init EAS project
```bash
npx eas init
```
Copy the `projectId` it prints, paste it into `app.json` → `extra.eas.projectId`.

### 3. Fill in your Apple credentials in eas.json
Edit `eas.json` → `submit.production.ios`:
- `appleId` → your Apple ID email
- `ascAppId` → App Store Connect App ID (the numeric one from App Store Connect → App → General → Apple ID)
- `appleTeamId` → your 10-char team ID from developer.apple.com

### 4. Create App Store Connect app (if not done yet)
Go to appstoreconnect.apple.com → Apps → + New App → fill in bundle ID `com.timpik1985.lomedotiot`.

### 5. Push to GitHub
```bash
git init
git add .
git commit -m "init Sound Quest"
git remote add origin https://github.com/YOUR_USERNAME/sound-quest.git
git push -u origin main
```

### 6. Add EXPO_TOKEN secret to GitHub
- Go to expo.dev → Account Settings → Access Tokens → Create
- In GitHub repo → Settings → Secrets → Actions → New secret
- Name: `EXPO_TOKEN`, value: the token you just created

### 7. That's it!
Every push to `main` now:
1. Triggers GitHub Actions
2. EAS builds the iOS app on Expo's cloud (Xcode 16, latest image)
3. Automatically submits to TestFlight
4. You get a notification on your iPhone within ~20 minutes

## Manual build (optional)
```bash
# Build only
eas build --platform ios --profile production

# Submit last build
eas submit --platform ios --latest
```

## Replace placeholder assets before App Store submission
- `assets/icon.png` → 1024×1024 PNG, no transparency
- `assets/splash.png` → 1284×2778 PNG recommended
- `assets/adaptive-icon.png` → 1024×1024 PNG
