# Eventora — Smart Event Management Platform

This folder contains the source project for Eventora. It is a React + Vite front end with event discovery, event creation, favorites, calendar, demo bookings, local authentication, and DSA utility demonstrations.

## Run locally

1. Install Node.js (compatible with the dependencies in package.json).
2. Open a terminal in this folder (`Project/Eventora`).
3. Run `npm install`.
4. Run `npm run dev` and open the local address shown by Vite.

## Structure

- `src/pages/` — event browsing, details, booking, favorites, calendar, login/register and other pages.
- `src/components/` — shared UI components including the algorithm coverage panel.
- `src/algorithms/` — KMP, Z-function, Rabin–Karp, fuzzy matching, similarity and ranking utilities.
- `src/data/events.js` — sample event data.
- `public/` and `src/assets/` — static assets.
- `backend/` — package configuration only; the supplied archive does not include a running API implementation.

## Important implementation notes

This is a demonstration prototype. Custom events, favorites, user records and tickets are stored locally in the browser. Login/register uses localStorage and is not suitable for production accounts. The booking flow does not process real payments. The CO1–CO6 panel presents academic mappings; the live algorithm widget implements and demonstrates KMP, Z-function and Rabin–Karp. It does not mean all listed advanced algorithms are implemented as working algorithms.
