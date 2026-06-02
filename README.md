# ShopVerse — E-Commerce Web Application

A production-ready, mobile-responsive e-commerce storefront built with React 18, TypeScript, Vite, Redux Toolkit, React Router, Tailwind CSS, and Axios.

## Features

- Product listing with category filtering via API (Escuela JS)
- URL-persisted filters and sorting (`?category=1&sort=price-asc`)
- Product detail from Redux store (no per-id API fetch)
- Cart with quantity controls, remove, and localStorage persistence
- Sticky navbar with cart badge and global footer with totals
- Playwright end-to-end tests

## Tech Stack

- React 18 + TypeScript + Vite
- Redux Toolkit + React Redux
- React Router DOM v6
- Tailwind CSS
- Axios
- Playwright

## Getting Started

### Prerequisites

- Node.js 18+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm run preview
```

### E2E Tests

```bash
npx playwright install chromium
npm run test:e2e
```

## Project Structure

```
src/
├── assets/
├── components/     # Navbar, ProductCard, Footer, FilterBar, LoadingSpinner
├── pages/          # Home, ProductDetail, Cart
├── store/          # Redux store, cartSlice, productSlice
├── services/       # Axios API client
├── types/          # Product, Cart interfaces
├── routes/         # AppRouter
├── tests/          # Playwright specs
├── hooks/          # useUrlQuery (URL persistence without useSearchParams)
└── utils/          # URL query & sort helpers
```

## API

Base URL: `https://api.escuelajs.co/api/v1`

- `GET /products`
- `GET /categories`
- `GET /products/?categoryId={id}`

## URL Query Parameters

| Param      | Example       | Description                          |
|------------|---------------|--------------------------------------|
| `category` | `1`           | Filter products by category ID       |
| `sort`     | `price-asc`   | `price-asc`, `price-desc`, `name-asc`, `name-desc` |

## Assumptions & Notes

- Sorting is applied client-side on API results (API does not expose sort params).
- Category filtering always refetches from the API.
- Cart is stored in `localStorage` under key `ecommerce-cart`.
- Product detail requires visiting home first so products exist in Redux.

## License

MIT
