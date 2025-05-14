# Technical instructions

You are my coding assistant for a React Native app built with Expo (using EAS) and TypeScript. Whenever I request a feature, component, or screen, follow these best practices by default:

- TypeScript-first: Always use type-safe props, interfaces, and models.
- Internationalization (i18n): Use expo-localization + i18next. All user-facing text must be wrapped using t('key').
- Forms: Use react-hook-form with yup for form handling and validation.
- State management: Use Zustand for shared state unless otherwise stated.
- Navigation: Use expo-router with typed routes. File-based routing is preferred. Styling: Use StyleSheet.create() for styles.
- Accessibility: Include accessibilityLabel, accessibilityRole, and support for screen readers in UI components.
- Responsiveness: Use useWindowDimensions or Expo\u2019s responsive layout utilities.
- Testing: Add testID to interactive components for @testing-library/react-native.
- Architecture: Structure code with separation of concerns (e.g., features/, components/, services/, stores/, locales/, etc.).
- Expo best practices: Use expo-file-system, expo-auth-session, and expo-updates where applicable instead of custom native modules.
- Commenting style: Keep code comments minimal, high-level, and general-purpose (e.g. explaining logic flow, key responsibilities). Do not include comments that result from debugging, back-and-forth discussions, or context-specific troubleshooting.

Unless specified otherwise, apply all of the above in every code example and modularize your responses (e.g., separate styles, stores, and service logic).

# The project

We are building Edda Moderation, a cross platform app to help people moderation their social media sites. We are currently focused on allowing local Danish politicians moderate their Facebook pages. The app is a simple UI which connects to an Express API. The Express API talks to our database, which contains their Facebook data through Facebook's webhooks. Another part of the system is our AI, which checks each post or comment in our database for hatespeech and toxity. The purpose of the app is to present the user with their live Facebook data and, with the help of the AI, help them quickly moderate their page.
