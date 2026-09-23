# Robofriends

Robofriends is a small React application that fetches sample user records and presents them as robot profile cards. Search filters the loaded cards by name. It is a frontend practice project using placeholder data, not a data-analysis project.

## Technologies

- React 17 function components and Hooks (`useState`, `useEffect`)
- Fetch API with JSONPlaceholder's public sample-users endpoint
- RoboHash image URLs and Tachyons utility classes
- Create React App 4 for development, tests, and production builds
- React Testing Library for component-level behavior checks

## How it works

1. When the app loads, it requests the sample users from JSONPlaceholder.
2. While the request is pending, the page announces a loading state.
3. On success, the app renders robot cards and filters them client-side as the search field changes.
4. If the request fails, the page reports the problem and offers a retry. An empty list and a search with no matches have separate messages.

## Run locally

Requires Node.js and npm. From the repository root:

```bash
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000). The app needs an internet connection to load the sample users and remote images.

## Check the project

```bash
npm test -- --watchAll=false
npm run build
```

## What this project demonstrates

- Managing loading, success, empty, and error states for an asynchronous request
- Keeping search input and results in React state
- Making a form control accessible with a visible label and announcing status updates
- Rendering a list with stable record keys

## Limitations and next steps

JSONPlaceholder provides synthetic placeholder records, and the search only covers the small list already loaded in the browser. RoboHash images are generated from remote URLs. The app does not authenticate users, persist changes, or analyze real-world data. A useful next step is to expand the component tests and document a deployment only after verifying the published site.
