# How AI was used in this project

The task rules allow AI tools, as long as I understand and can explain my code. This file says plainly what AI did, what I did, and how I checked that I understand the result.

## What AI did

| Part | AI's role |
|---|---|
| Most of the code (components, pages, contexts, hooks, CSS) | An AI coding assistant (Claude) wrote the first versions from the task requirements |
| Debugging and explanations | I asked AI to explain errors and concepts I hadn't used before |
| Demo content | The 10 fictional stories in `src/data/stories.json` were written by AI |
| Docs | AI helped draft this file and the README |

## What I did

- Gave the requirements and reviewed every file until I could explain why each piece is there (see below).
- Checked that it works: `npm run build` succeeds and `npm run lint` reports no errors.

## Can I explain it? The key ideas, in my own words

**How does "Save for later" survive a refresh?**
`hooks/useLocalStorage.js` works like `useState`, but it reads the starting value from `localStorage` and writes it back in a `useEffect` whenever it changes. If the stored JSON is corrupted, the `try/catch` falls back to the default value, so the app doesn't crash. `SavedContext` wraps the hook so the header badge, the cards and the Saved page all share one list.

**Why store only story IDs?**
It keeps storage small, and if a story's text changes, the Saved page still shows the latest version. The JSON stays the single source of truth.

**Why Context instead of props?**
Many components at different depths need the same saved list. Passing it through every layer ("prop drilling") would be messy.

**Why are search and filter in the URL (`?q=...&category=...`)?**
The filtered view survives a refresh, the back button works, and the link can be shared. `useSearchParams` from React Router reads and writes it.

**Why does the Save button call `preventDefault()` and `stopPropagation()`?**
The button sits inside a card that is a `<Link>`. Without those calls, clicking Save would also open the article.

**How does dark mode avoid a white flash?**
Colours are CSS variables on `:root`, and `[data-theme='dark']` overrides them. A small inline script in `index.html` sets `data-theme` *before* React loads, and `ThemeContext` takes over after that.

**Why `vercel.json` and `public/_redirects`?**
With `BrowserRouter`, a URL like `/story/abc` isn't a real file on the server. The rewrite sends every path to `index.html`, so refreshing a deep link doesn't give a 404.

**Where do the images come from?**
`components/Cover.jsx` draws an SVG skyline. A random generator seeded by the story ID makes each story always get the same picture. That means no image hosting and no copyright problems.

## Known limitations

- There are no automated tests for the frontend.
- The linter shows four warnings (calling `new Date()` during render, and the context files exporting both a component and a hook). They don't affect behaviour.
