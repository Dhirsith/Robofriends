# Robofriends

A small React app that fetches a list of sample users and displays them as robot cards. Search filters the list by name.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The app uses the public JSONPlaceholder sample-users endpoint and RoboHash images, so an internet connection is needed for the remote data and images.

## Current behavior

- Shows a loading state while the user list is fetched.
- Reports request and response errors and lets the user retry.
- Handles an empty result list and a search with no matches.
- Gives the search field an accessible label and announces result counts.

## Known limits and next improvements

This is a frontend learning demo, not a data-science project. The user records are placeholder data, and the search only filters names already loaded in the browser. Useful next steps are component tests for loading, error, filtering, and empty states; pagination or server-side search for larger datasets; and a project-specific deployment guide if the app is published.
