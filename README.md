# mObywatel Razem

A clickable prototype of a new mObywatel, Poland's government app, made for the [mObywatel Challenge](https://mobywatel.ai/). This is an independent concept and not the official mObywatel app. Every person and record in it is made up.

**Live prototype:** https://metuan.github.io/mobywatel-challenge/

![The prototype on desktop: the story on the left, the phone in the middle, "How it works" on the right](docs/screenshots/story.png)

## What's inside

The prototype follows one week in the life of the Nowicki family across 13 chapters. They cover an ID on the phone, moving house, the car, a new baby, a cardiology appointment, a letter from the tax office, an RCB air-raid alert, reporting damage afterwards, a simplified mode for an elderly father, a shared family calendar, signing a citizens' bill, and control over your own data. Each chapter shows how the task works today and how it would work in the new app. A "Dotknij tutaj" (tap here) hint walks the visitor through each step.

On every screen, a "Jak to działa" (how it works) panel explains which public systems the step relies on, and which of them already exist and which still need to be built.

The app itself is in Polish, because it is a Polish public service.

![Screens: Today, Documents, moving house, RCB alert](docs/screenshots/screens.png)

## Getting started

You need Node.js 22 (the version is pinned in `.nvmrc`).

```bash
npm ci
npm run dev        # dev server with hot reload
npm run build      # dist/index.html, one self-contained file
npm run preview    # serve the production build
```

The build is a single HTML file with the code and styles inlined. It runs on GitHub Pages, straight from disk, and without a server.

| Script              | What it does                                                |
| ------------------- | ----------------------------------------------------------- |
| `npm run typecheck` | TypeScript in `strict` mode                                 |
| `npm run lint`      | ESLint for code and Stylelint for styles                    |
| `npm run format`    | Prettier                                                    |
| `npm test`          | unit tests (Vitest)                                         |
| `npm run test:e2e`  | Playwright plays the whole story on desktop and phone sizes |
| `npm run check`     | everything above except e2e, plus a build                   |

## Project structure

```
src/
  main.ts              entry point: styles and mounting the app
  types.ts             AppState, Ctx (what every screen receives), sheets, toasts
  app/                 shell: App, routes (routes.ts), gestures, Dynamic Island
  screens/             screens grouped by tab and topic
    today/ matters/ family/ safety/ docs/ profile/ trust/ money/ easy/ ...
  flows/               multi-step tasks: moving, new baby, doctor visit, letter, damage claim, signing
  story/               chapters and beats, "tap here" coach marks, intro tour, how-to answers
  tech/                content for the "how it works" panel
  ui/                  shared components: icons, illustrations, document card, controls, hooks
  lib/                 Preact + htm, browser helpers, shared-element transitions
  styles/
    00-tokens.css      design tokens: colour, type, elevation, motion
    01-…25-*.css       style layers; their import order in index.css matters
tests/
  unit/                story and route data consistency, search
  e2e/                 plays every chapter, renders every screen
```

## How it works

- **Views** are functions that return [htm](https://github.com/developit/htm) templates rendered by [Preact](https://preactjs.com/). There is no JSX build step, and screen code stays close to plain HTML.
- **Routes** live in the URL hash (`#move-1`, `#alert-red`). `src/app/routes.ts` maps 82 routes to screens, so any screen can be opened from a link.
- **State** (`AppState`) only records what the visitor has done so far: a fine paid, a form signed, an appointment booked. Every screen receives a `Ctx` with navigation, state and confirmation sheets.
- **The story** is plain data in `src/story/chapters.ts`: chapters (today versus the new app) and beats, each naming the element to tap. The same data drives the side panel, the phone's story bar, the coach marks and the e2e tests.
- **Motion** respects `prefers-reduced-motion`, and every animation checks it first.

## Tests and CI

Every pull request runs through GitHub Actions: types, lint, formatting, unit tests, a build, and an end-to-end test. The e2e test plays all 13 chapters at two screen sizes by tapping whatever the coach mark points at, and checks that each of the 82 screens renders without errors.

When a change lands on `main`, `deploy.yml` builds the prototype and publishes it to GitHub Pages.

## Disclaimer

This is an independent concept made for the mObywatel Challenge. It is not affiliated with the Ministry of Digital Affairs or with the official mObywatel app. The people, addresses, numbers and documents in the prototype are fictional.
