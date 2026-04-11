# Sankalp App

Sankalp App is a mobile application designed to help families stay connected, safe, and productive.

## Project Overview

This app provides background location tracking, family member management, multi-tier task organization, and voice-assisted task creation. It is built with React Native and Firebase to support offline task persistence, configurable location updates, and real-time notifications.

## Core Features

1. **Authentication System**
   - User registration and login with Firebase Authentication
   - Password reset functionality
   - Persistent login state across app sessions

2. **TODO Management**
   - Create, read, update, and delete TODO items
   - Each TODO has:
     - Title (required)
     - Description (optional)
     - Completion time/date (optional)
     - Category (Work, Personal, Health, Shopping, Learning, Other)
   - Mark TODOs as completed/incomplete
   - Real-time sync with Firestore database
   - User-specific TODO lists

3. **Family Safety Features** (Planned)
   - Background location tracking and family management
   - Family Tree: manage and view family members in one place
   - Alarm: notify family members when alerts are triggered
   - Location storage: record device location every 2 minutes locally, then upload to the server after 6 minutes
   - Configurable background tracking and upload intervals
   - Support for detecting shutdown or power-off events to preserve and deliver stored location data

4. **Advanced Task Management** (Planned)
   - Multi-tier task management
   - Free-flow task list for flexible task creation
   - Time-based task list for scheduled activities
   - Daily and regular reminders to complete tasks
   - Voice-based search and task creation
   - Task categorization by list and type
   - Admin access for managing users and settings

## Important Considerations

- Battery Optimization: use significant location change listeners instead of constant polling to minimize battery drain.
- Permissions: request `ACCESS_BACKGROUND_LOCATION` on Android 11+ and `Always Allow` on iOS, otherwise the OS may kill the background process.
- Task Persistence: store daily tasks in a local database so they remain available offline and sync with the server only when a connection is available.

## Tech Stack

- **Frontend**: React Native with Expo
  - Geolocation (planned)
  - Notifications (planned)
- **Backend**: Firebase
  - Authentication (implemented)
  - Firestore database for TODO management (implemented)
  - Location updates and messaging via Firebase Cloud Messaging (planned)

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
