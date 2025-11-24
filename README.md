````markdown
# Trading Platform Creator

Trading Platform is a responsive crypto dashboard featuring live market data streams, customizable display settings, and interactive token analysis.

## Features

* **Live Market Feed** – Real-time simulated updates for "New Pairs", "Final Stretch", and "Migrated" columns.
* **Responsive Design** – Fully optimized layout that scales from mobile (320px) to ultrawide desktops.
* **Interactive UI** – Custom modals for filtering, token details, and display settings (Dark/Grey themes, toggle decimals, etc.).
* **Chain Selection** – Switch between BNB and SOL chains with preserved UI states.

## Tech Stack

* **Framework:** [Next.js 15+ (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

Unlike traditional Next.js projects, this codebase uses an "Extreme Monolith" pattern to minimize file count:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── icon.png
├── tailwind.config.js
└── next.config.js
````

## Getting Started

1.  **Install Dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

2.  **Run Development Server:**

    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Navigate to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the dashboard.

## Customization

Since all logic is in `app/page.tsx`, you can make changes directly:

  * **Modify Mock Data:** Search for `const TOKENS` or `getColumnData` to change the initial token list.
  * **Adjust Refresh Rate:** Look for the `useEffect` hook containing `setInterval` to change the 2-second update frequency.
  * **Theme Colors:** Update the `bg-[#...]` classes or extend `tailwind.config.js`.

## Deployment

Navigate to [https://eterna-lab-crypto-trading.vercel.app/]([https://www.google.com/search?q=http://localhost:3000](https://eterna-lab-crypto-trading.vercel.app/)) to view the dashboard live.
