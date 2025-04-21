# Premiere ligue app

A React Native application that enables a user to select any team in the 2024/25 season of the English premier league and return the squad details for that chosen team

## Features

- Request list of squads by name
- See the list of player of each squad
- Request information about every player of the sqad

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd premiere-ligue
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file and set your API URL:
   ```
   EXPO_PUBLIC_API_URL=https://api-football-v1.p.rapidapi.com/v3
   EXPO_PUBLIC_API_KEY=
   RAPID_HOST=api-football-v1.p.rapidapi.com
   ```

## Running the App

### Development

1. Start the Expo development server:
   ```bash
   npx expo start
   ```

2. Run on specific platforms:
   - Press `i` to run on iOS Simulator
   - Press `a` to run on Android Emulator
   - Press `w` to run in web browser

### Production Build

#### Deploy to Firebase:

```bash
# Deploy Android build to Firebase
fastlane firebase platform:android
```


```bash
# Deploy IOS for Test Flight
fastlane store platfrom:ios applicationPassword:[IOS_APPLICAION_PASSWORD]
```

## Project Structure

- `/app` - Main application screens and navigation
  - `/(tabs)` - Tab-based navigation screens
  - `index.tsx` - Entry point
- `/components` - Reusable React components
- `/api` - API client and endpoints
- `/store` - Global state management (Zustand)
- `/types` - TypeScript type definitions

## Environment Variables

The following environment variables are required:

| Variable | Description                   | Example |
|----------|-------------------------------|---------|
| EXPO_PUBLIC_API_URL | Base URL for the API          | https://api-football-v1.p.rapidapi.com/v3 |
| EXPO_PUBLIC_API_KEY | Secret key for connect to API |  |
| RAPID_HOST | Host for API headers request  | api-football-v1.p.rapidapi.com |


## Technologies Used

- React Native
- Expo
- TypeScript
- Zustand (State Management)
- React Query
- Gluestack UI
- React Native Reanimated
- Expo Router

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
