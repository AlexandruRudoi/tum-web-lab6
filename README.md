# TUM Web — Lab 6 · HAPPINESS Beauty Salon

Client-side web application for a beauty salon, built for **TUM Web Lab 6**.

The repository will hold both the front-end and (later) the back-end of the project.

## Repository structure

```
tum-web-lab6/
├── Salon.Web/        # React + Vite front-end (this lab)
├── Salon.Api/        # backend (added later)
└── README.md
```

## Front-end

See [Salon.Web/README.md](Salon.Web/README.md).

```bash
cd Salon.Web
npm install
npm run dev
```

## Project description

**HAPPINESS Beauty Salon** is a client-side single-page application that allows
users to:

- browse beauty **services** (haircut, manicure, makeup, …)
- explore **products** sold in the salon
- read salon **news & promotions**
- create a **booking** request
- access an admin **dashboard** to manage all entities

All state is kept in memory; persistent state (entities, favorites, theme) is
stored in the browser via `localStorage`.

The app supports a custom **light / dark theme** with a beauty-salon look
(pink + rose-gold accents).

## Workflow & branching

- `main` — stable, deployable
- Feature branches use the format: `<type>/<short-description>`
  - `feat/services-page`
  - `chore/scaffold-frontend`
  - `fix/booking-form-validation`
- **Conventional Commits** for messages (`feat:`, `chore:`, `fix:`, `style:`, …)
- Each big feature → branch → push → PR with **rebase** merge → pull `main`

## Hosting

The final application will be deployed to **GitHub Pages**.
