# Sankalp App

Sankalp App is a mobile application designed to help families stay connected, safe, and productive.

## Project Overview

This app provides background location tracking, family member management, multi-tier task organization, and voice-assisted task creation. It is built with React Native and Firebase to support offline task persistence, configurable location updates, and real-time notifications.

## Core Features

1. Mobile application for family safety and task management
2. Background location tracking and family management
   - Family Tree: manage and view family members in one place
   - Alarm: notify family members when alerts are triggered
   - Location storage: record device location every 2 minutes locally, then upload to the server after 6 minutes
   - Configurable background tracking and upload intervals
   - Support for detecting shutdown or power-off events to preserve and deliver stored location data
3. Multi-tier task management
   - Free-flow task list for flexible task creation
   - Time-based task list for scheduled activities
   - Daily and regular reminders to complete tasks
4. Voice-based search and task creation
5. Task categorization by list and type
6. Admin access for managing users and settings

## Important Considerations

- Battery Optimization: use significant location change listeners instead of constant polling to minimize battery drain.
- Permissions: request `ACCESS_BACKGROUND_LOCATION` on Android 11+ and `Always Allow` on iOS, otherwise the OS may kill the background process.
- Task Persistence: store daily tasks in a local database so they remain available offline and sync with the server only when a connection is available.

## Tech Stack

- Frontend: React Native
  - Geolocation
  - Notifications
- Backend: Firebase
  - Authentication
  - Location updates and messaging via Firebase Cloud Messaging

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Notes

- This app uses Expo and file-based routing under the `app/` directory.
- Use the existing `scripts/reset-project.js` command only if you want to reset the starter app structure.
