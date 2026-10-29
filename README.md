# The Daily Bugle 📰

A responsive news web app for the Daily Bugle, where readers browse stories about New York's masked vigilante and save the ones they like. Built with **React + Vite** for The CodeBreakers Club Frontend task (1st year).

**Live demo:** https://daily-bugle-five.vercel.app/

## Features

| Requirement | How it's done |
|---|---|
| Home page with a featured story and a grid of cards | `pages/Home.jsx` shows the story marked `"featured": true`, then a responsive CSS grid of `StoryCard`s (image, title, category, date) |
| Full article page | `pages/Article.jsx`, route `/story/:slug`, plus "More in this category" |
| Search + category filter | Search matches title, excerpt and author. Category chips come from the data. Both are kept in the URL (`?q=bridge&category=City`), so filtered views survive refresh and can be shared |
| Save for later + Saved page | Bookmark button on every card and article. IDs are stored in `localStorage` through a `useLocalStorage` hook and a `SavedContext`, so they persist after refresh |
| 8+ stories, no backend | 10 stories in `src/data/stories.json` |
| Mobile + desktop layout | CSS grid with `auto-fill`, breakpoints at 820px and 520px, consistent design tokens (colours, type, spacing) |
| **Bonus:** dark mode | Toggle in the header. Follows the OS setting on first visit, then remembers your choice. An inline script applies it before React loads, so there's no flash |
| **Bonus:** deploy | `vercel.json` and `public/_redirects` included so deep links like `/story/...` work on Vercel and Netlify |

Extra touches: a 404 page for unknown stories, an empty state for searches with no results, keyboard focus styles, `aria-pressed` on toggle buttons, and `prefers-reduced-motion` support.

Story images are generated SVG city skylines (`components/Cover.jsx`), seeded by story ID so each story always gets the same picture. This avoids hosting image files and avoids using copyrighted artwork.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Requires Node 20.19+ (or 22.12+).

## Deploy

**Vercel:** import the GitHub repo → framework "Vite" → deploy. No settings needed.
**Netlify:** build command `npm run build`, publish directory `dist`.

## Folder structure

```
src/
├── components/   Header, StoryCard, SaveButton, Cover (SVG illustration)
├── context/      SavedContext (saved stories), ThemeContext (dark mode)
├── hooks/        useLocalStorage
├── pages/        Home, Article, Saved, NotFound
├── utils/        stories.js (sorting, search/filter, date formatting)
├── data/         stories.json
├── App.jsx       routes
└── main.jsx      router + providers
```

## Design decisions

- **Only IDs are saved**, not whole story objects. If a story is edited, the saved list shows the latest version, and storage stays tiny.
- **Filters live in the URL, not component state.** Refresh, back button and shared links all keep the filter.
- **Context instead of prop drilling.** The saved count in the header and the button on every card read the same state.
- **No UI library.** Plain CSS with variables keeps the bundle small and makes theming a matter of swapping variables under `[data-theme='dark']`.

All stories are fictional and written for this demo.

## AI usage

AI tools were used to build this project. [AI_USAGE.md](AI_USAGE.md) explains what AI did, what I did, and the key ideas in my own words.
