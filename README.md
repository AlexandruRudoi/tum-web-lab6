# TUM Web — Lab 6 · HAPPINESS Beauty Salon

Client-side web application for a beauty salon, built as the cumulative lab assignment
for the **TUM · Web Programming** course.

The repository will hold both the front-end and (later) the back-end of the project.

---

## 1. Project description

**HAPPINESS Beauty Salon** is a single-page application for a fictional beauty salon
in Cluj-Napoca. It lets visitors browse the salon's offering, read announcements
and reach out via a contact form, while staff with manage rights can administer the
underlying content.

### Visitor features

- **Home page** with a hero section, featured services, products and latest news.
- **Services page** — list of beauty services with category filter, sorting,
  search, like/unlike and a service-detail page.
- **Products page** — products sold in the salon with the same browsing UX.
- **News page** — promotions and announcements with pin and like.
- **Booking page** — form to request a beauty appointment.
- **Contact page** — address, phone, email, opening hours, working contact form
  (client-side only for now) and a Google Maps embed.
- **Light / dark theme** with brand gold-accented palette.
- **EN / RO localization** with a language switcher and persistent preference.

### Manager features (gated by a `CAN_MANAGE` flag)

- Create / edit / delete services, products and news.
- Dashboard with counts and quick links.
- Pinning news, liking entities, all persisted in `localStorage`.

### Accessibility

- Integrated **tabnav** WCAG accessibility widget styled with the brand color.
- Semantic HTML, keyboard-friendly controls and screen-reader labels for icon
  buttons.

### Persistence

- All entity state, favorites, language and theme preferences are persisted in the
  browser via `localStorage`. There is no backend yet — everything runs offline
  after the first load.

---

## 2. Stack

| Layer            | Tech                                                                |
| ---------------- | ------------------------------------------------------------------- |
| UI framework     | **React 19** + **Vite 8**                                           |
| Styling          | **Tailwind CSS v4** (`@tailwindcss/vite`) with custom theme         |
| Routing          | **React Router v7** (`createBrowserRouter`)                         |
| State management | React Context + custom hooks                                        |
| i18n             | **i18next** + `react-i18next` + `i18next-browser-languagedetector`  |
| Icons            | **lucide-react** + inline SVGs                                      |
| Notifications    | **react-toastify**                                                  |
| Persistence      | `localStorage`                                                      |
| Container        | Multi-stage **Docker** build → **nginx 1.27**                       |

---

## 3. Repository structure

```
tum-web-lab6/
├── Salon.Web/                  # React + Vite front-end
│   ├── public/
│   │   └── images/             # local service / product / news photos
│   ├── src/
│   │   ├── assets/             # logo, fonts, static svgs
│   │   ├── components/         # UI building blocks (cards, layout, common)
│   │   ├── context/            # ServicesProvider, ProductsProvider, NewsProvider…
│   │   ├── data/seed/          # initial in-memory seed for entities
│   │   ├── hooks/              # useEntityState, useTranslateService…
│   │   ├── i18n/locales/       # en.json, ro.json
│   │   ├── pages/              # route-level pages (Home, Services, Contact…)
│   │   ├── router/             # react-router config
│   │   ├── theme/              # design tokens + useTheme
│   │   ├── utils/              # helpers (id, date, translateService…)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind v4 theme tokens
│   ├── Dockerfile              # Node build → nginx serve
│   ├── nginx.conf              # SPA fallback, gzip, security headers, /healthz
│   └── README.md
├── docker-compose.dev.yml      # hot-reload dev server (port 5173)
├── docker-compose.staging.yml  # nginx image, port 8080
├── docker-compose.prod.yml     # nginx image, port 80, resource limits
└── README.md                   # this file
```

---

## 4. Getting started

### Local development (npm)

```bash
cd Salon.Web
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run build        # production build → Salon.Web/dist
npm run preview      # preview the production build
npm run lint         # eslint
```

### Local development (Docker, hot reload)

From the repo root:

```bash
docker compose -f docker-compose.dev.yml up
# open http://localhost:5173
```

The dev compose mounts `Salon.Web/` into a `node:20-alpine` container and runs
the Vite dev server with file polling (works on Windows / WSL bind mounts).

### Staging build

```bash
docker compose -f docker-compose.staging.yml up --build -d
# open http://localhost:8080
```

### Production build

```bash
docker compose -f docker-compose.prod.yml up --build -d
# open http://localhost
```

The image is a multi-stage build: stage 1 compiles the Vite app inside
`node:20-alpine`, stage 2 copies `dist/` into `nginx:1.27-alpine` and serves it
with an SPA fallback (`try_files $uri $uri/ /index.html`), gzip, security
headers and a `/healthz` endpoint used by the container healthcheck.

> Only one of staging (`8080:80`) and prod (`80:80`) can run at a time on the
> same host because the container always listens on port 80 internally and the
> compose files differ in the host-port mapping.

---

## 5. Workflow & branching

- `main` — stable, deployable.
- Feature branches use the format `<type>/<short-description>`:
  - `feat/services-page`
  - `feat/remaining-pages`
  - `chore/scaffold-frontend`
  - `fix/booking-form-validation`
  - `lab-6` — branch holding the consolidated work for this lab.
- Commit messages follow **Conventional Commits** (`feat:`, `chore:`, `fix:`,
  `style:`, `docs:`, `refactor:`).
- Each major feature lives on its own branch, gets pushed and is merged into
  `main` via a **rebase** merge to keep history linear.

---

## 6. Hosting

The application is deployed on a **Linux virtual machine** as a **Docker
container** running the production image (multi-stage build → `nginx:1.27-alpine`).

Deployment flow on the VM:

```bash
git pull
docker compose -f docker-compose.prod.yml up --build -d
```

The container exposes port `80` on the host, serves the static Vite bundle
through nginx with SPA fallback, gzip and security headers, and is monitored via
the built-in `/healthz` endpoint.
