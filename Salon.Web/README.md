# Salon.Web — HAPPINESS Beauty Salon

Front-end application for the HAPPINESS Beauty Salon (TUM Web Lab 6).

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router v7**
- **React Context** for app state
- **localStorage** for persistence
- **react-toastify** for notifications
- **lucide-react** for icons

## Scripts

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run eslint
```

## Project structure

```
src/
├── assets/
├── components/
│   ├── common/       # shared UI (PagePlaceholder, future Button, Card, Modal...)
│   └── layout/       # Layout, Navbar, Footer
├── context/          # React contexts (ThemeContext, future entity contexts)
├── hooks/            # reusable hooks
├── pages/            # route-level pages
├── router/           # react-router config
├── storage/          # localStorage wrapper
├── theme/            # design tokens + useTheme
├── utils/            # helpers
├── App.jsx
├── main.jsx
└── index.css
```
