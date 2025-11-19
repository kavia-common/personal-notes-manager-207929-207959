# Ocean Notes - React Frontend

Modern, lightweight notes manager using the Ocean Professional theme.

## Run locally

1. Install dependencies
   npm install

2. Start dev server
   npm start

The app will be available at http://localhost:3000.

## Features

- Notes list with search and selection
- Create, edit (title and body), and delete notes
- Autosave (configurable via feature flags)
- LocalStorage persistence by default
- Optional REST API mode (CRUD at /notes)
- Responsive UI, subtle gradients, rounded corners

## Environment variables

Set these in your `.env` (do not commit secrets):

- REACT_APP_API_BASE: Base URL for backend (e.g., http://localhost:4000)
- REACT_APP_BACKEND_URL: Alternate variable name for backend base URL
- REACT_APP_FEATURE_FLAGS: JSON or comma-separated flags. Example values:
  - JSON: {"autosave": true, "search": true}
  - CSV: autosave=true,search=true

If neither REACT_APP_API_BASE nor REACT_APP_BACKEND_URL is set, the app uses LocalStorage.

## Switching to a backend

When a backend is available that exposes REST endpoints:

- GET    {base}/notes
- POST   {base}/notes
- GET    {base}/notes/:id
- PUT    {base}/notes/:id
- DELETE {base}/notes/:id

Set REACT_APP_API_BASE (or REACT_APP_BACKEND_URL) to the backend base URL and restart the dev server. The app will automatically use the remote API.

## NotesService

All data operations are encapsulated in `src/services/NotesService.js` to keep the UI decoupled from the persistence layer. This enables easy future backend integrations.

## Feature Flags

- autosave (default: true)
- search (default: true)

Configure via REACT_APP_FEATURE_FLAGS as JSON or CSV string.

## Style

Ocean Professional palette:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

