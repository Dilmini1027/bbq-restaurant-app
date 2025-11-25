# Smoky Kitchen — BBQ Restaurant Web App

Live demo: https://bbq-restaurant-app-49ta.vercel.app/

Source: https://github.com/Dilmini1027/bbq-restaurant-app

A modern, responsive BBQ restaurant web application built with React. The project includes an interactive menu, persistent cart with animated feedback, reservation workflow, and production deployment instructions.

---

## Key Features

- Interactive menu with category filters (Appetizers, Mains, Sides, Desserts, Beverages)
- Persistent shopping cart using React Context + localStorage
- Animated cart feedback — flying "+1" animation when an item is added
- Quantity management, remove item, and checkout flow stub
- Reservation page with payment integration placeholder
- Responsive, mobile-first UI styled with Tailwind CSS
- SEO-friendly pages (lazy loading images, document title and meta description updates)

## Tech Stack

- React 19
- React Router DOM
- Tailwind CSS
- LocalStorage for cart persistence
- Deployed on Vercel (recommended)

## Getting Started (local)

1. Clone the repo

```bash
git clone https://github.com/Dilmini1027/bbq-restaurant-app.git
cd bbq-restaurant-app
```

2. Install dependencies

```bash
npm install
```

3. Run the dev server

```bash
npm start
```

App will be available at `http://localhost:3000` (the dev server may prompt to run on another port if 3000 is busy).

## Build for Production

```bash
npm run build
```

This creates an optimized `build` folder suitable for deployment.

## Deploy (Vercel)

1. Push your repository to GitHub.
2. Import the repo into Vercel and set the framework preset to **Create React App**.
3. If you encounter dependency resolution errors on Vercel, set the install or build command to:

```bash
npm install --legacy-peer-deps && npm run build
```

4. Set the output directory to `build`.

## Environment & Configuration

- If you integrate real payment gateways or third-party APIs, add environment variables in Vercel or a `.env` file locally. Do not commit secrets to the repo.

## Notes & Known Issues

- `react-helmet-async` was removed due to peer dependency conflicts with React 19; the app uses direct `document.title` and meta manipulation where needed.
- If you see dependency resolution issues during deployment, prefer `--legacy-peer-deps` or upgrade/downgrade the conflicting packages.

## Contributing

Contributions, issues, and feature requests are welcome. Please open a GitHub issue or submit a pull request.

## License

This project is released under the MIT License.

---

### Contact

Developer: Dilmini — https://github.com/Dilmini1027

