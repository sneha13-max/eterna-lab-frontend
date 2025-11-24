# Eterna Labs Frontend

Eterna Labs is a responsive Next.js dashboard that streams live token market data with Solana/BNB switching, curated column presets, and adjustable display controls. The layout is optimized down to 320 px, so the experience scales cleanly from phones to ultrawide monitors.

## Features
- **Live Pulse Feed** – Three analytical columns (New Pairs, Final Stretch, Migrated) sourced via the `useWebSocket` hook and sortable via presets or manual filters.
- **Customizable Display** – Display modal settings, column filters, and token detail overlays powered by shared context.
- **Interactive Token Cards** – Rich metadata, tooltips, hover zoom, badges, and quick metrics with progress indicators.
- **Tailwind-Driven Responsiveness** – `xs` (320 px) breakpoint, mobile-friendly nav/sidebar/footer, and stackable grids for small screens.
- **Auto Layout Snapshots** – Planned gallery showing desktop/tablet/mobile states (see below for placeholders).

## Tech Stack
- [Next.js 13](https://nextjs.org/) (App Router, client components)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with custom `xs` breakpoint
- [Lucide Icons](https://lucide.dev/) for consistent iconography
- Context API + custom hooks for display settings and live data

## Getting Started
```bash
pnpm install   # or npm install / yarn install
pnpm dev       # start the development server
pnpm build     # create a production build
pnpm start     # run the production server
```

> **Note:** If you prefer npm or yarn, replace the commands above with your package manager equivalents. There is no dedicated lint command yet; run `next lint` or add a custom script as needed.

## Project Structure
```
app/                # Next.js app router pages, layout, styles
components/         # Reusable UI blocks (Navbar, PulseSidebar, TokenCard, etc.)
contexts/           # Display settings provider
lib/                # WebSocket hook, sorting helpers, utility functions
tailwind.config.js  # Tailwind theme, screens, plugins
```

## Responsive Design Notes
- `xs (320px)`, `sm (640px)`, `lg`, and `xl` utilities orchestrate the layout.
- Pulse toolbar wraps into two rows on mobile, column grid collapses to 1/2/3.
- Navbar, sidebar, token cards, skeletons, and footer each have mobile-specific adjustments (hamburger menu, horizontal scroll guards, condensed info blocks).

## Auto Layout Snapshots
Add exported screenshots to `public/screenshots/` (or your preferred directory) and update the table below with their filenames.

| Viewport | Description | Screenshot |
|----------|-------------|------------|
| Desktop (1440px) | Full Pulse dashboard with three analytical columns | ![Desktop](app/Screenshot%202025-11-20%20134732.png) |
| Tablet (768px) | Two-column grid, stacked controls | ![Tablet](app/Screenshot%202025-11-20%20134943.png) ||
| Mobile (320px) | Auto-layout stress test | ![320px](app/Screenshot%202025-11-20%20135003.png) |

Replace the placeholder image paths once the auto-layout snapshots are ready.

## Deployment
1. Configure environment variables (if any future API keys are added) in a `.env.local`.
2. Run `pnpm build`.
3. Deploy the `.next` output via Vercel, Netlify, or your preferred host.
4. Live preview: [https://eterna-labs-frontend-1jtv.vercel.app/](https://eterna-labs-frontend-1jtv.vercel.app/)

## Contributing
1. Fork and clone the repository.
2. Create a feature branch.
3. Keep changes accessible at 320 px, and document any new responsive utilities.
4. Open a pull request describing scope plus screenshots for key breakpoints.

---

Ready for screenshots: update the “Auto Layout Snapshots” table once assets are available. Let me know if you need a template for exporting them.

