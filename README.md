# TUM Web — Lab 7 · HAPPINESS Beauty Salon

Full-stack web application for a beauty salon, built as the cumulative lab assignment
for the **TUM · Web Programming** course.

The repository contains both the React front-end (`Salon.Web`) and the ASP.NET Core 9 back-end (`Salon.Api`).

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

### Staff features (Manager / Admin roles)

- **Login page** at `/login` with JWT-based authentication.
- **Dashboard** with entity counts, upcoming bookings, low-stock alerts and recent news.
- **Booking management** (`/manage-bookings`) — confirm, cancel or delete appointments.
- Create / edit / delete services, products and news.
- Pinning news, liking entities.

### Visitor booking persistence

- Visitor (unauthenticated) bookings are stored in `localStorage`.
- On page load, each stored booking is synced against the API so status changes made by staff are reflected in real time.
- If a booking is deleted by staff the entry is removed from `localStorage` automatically.

### Accessibility

- Integrated **tabnav** WCAG accessibility widget styled with the brand color.
- Semantic HTML, keyboard-friendly controls and screen-reader labels for icon buttons.

### Persistence

- Entity state is fetched from the API (PostgreSQL backend).
- Language and theme preferences are persisted in `localStorage`.

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
| Auth             | **JWT Bearer** (ASP.NET Core) + `localStorage` token cache          |
| Persistence      | **PostgreSQL 17** via EF Core 9 + Npgsql                            |
| Container        | Multi-stage **Docker** build — API (`dotnet/aspnet:9.0`) + Web (`nginx 1.27`) |

---

## 3. Repository structure

```
tum-web-lab6/
├── Salon.Api/                  # ASP.NET Core 9 Web API
│   ├── Controllers/            # AuthController, BookingsController, …
│   ├── Dtos/                   # request/response DTOs + mappers
│   ├── Program.cs              # DI, JWT, CORS, Swagger, auto-migrate & seed
│   └── Dockerfile              # multi-stage SDK build → aspnet:9.0 runtime
├── Salon.Domain/               # entities, enums, interfaces
├── Salon.Postgres/             # EF Core DbContext, migrations, seeders, repos
├── Salon.Repositories/         # repository interfaces
├── Salon.Services/             # business logic services
├── Salon.Tests/                # xUnit test project
├── Salon.Web/                  # React 19 + Vite front-end
│   ├── public/images/          # local service / product / news photos
│   ├── src/
│   │   ├── api/                # typed API clients (client.js, bookingsApi.js, …)
│   │   ├── components/         # UI building blocks (cards, layout, common)
│   │   ├── context/            # AuthProvider, ServicesProvider, …
│   │   ├── pages/              # route-level pages
│   │   ├── router/             # react-router config
│   │   └── i18n/locales/       # en.json, ro.json
│   ├── Dockerfile              # Node build → nginx serve
│   └── nginx.conf              # SPA fallback, /api proxy, gzip, /healthz
├── .env.example                # required env vars for prod
├── docker-compose.dev.yml      # Vite dev server (port 5173)
├── docker-compose.staging.yml  # nginx image, port 8080
├── docker-compose.prod.yml     # postgres + api + web, port 80
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

### Production build (full stack)

```bash
# 1. Create .env from the template and fill in secrets
cp .env.example .env

# 2. Start only Postgres first (run migrations before the API)
docker compose -f docker-compose.prod.yml up -d postgres

# 3. Run EF Core migrations
dotnet ef database update --project Salon.Postgres --startup-project Salon.Api

# 4. Build and start everything
docker compose -f docker-compose.prod.yml up -d --build
# open http://localhost
```

The compose stack runs three services: `postgres` (PostgreSQL 17), `api`
(ASP.NET Core 9, port 8080 internal) and `web` (nginx 1.27, port 80 public).
nginx proxies `/api/*` requests to the API container and serves the Vite SPA
for all other routes.

> Only one of staging (`8080:80`) and prod (`80:80`) can run at a time on the
> same host because the web container always listens on port 80 internally.

---

## 5. Workflow & branching

- `main` — stable, deployable.
- Feature branches use the format `<type>/<short-description>`:
  - `feat/services-page`
  - `feat/remaining-pages`
  - `chore/scaffold-frontend`
  - `fix/booking-form-validation`
  - `lab-7` — branch holding the consolidated work for this lab.
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
