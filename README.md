# StockFlow

StockFlow is a responsive inventory management dashboard built with Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth, Recharts, Lucide, React Hook Form, and Zod.

## Features

- Overview metrics, six-month inventory valuation chart, recent movements, top products, and low-stock alerts.
- Product catalog with add/edit/delete, validation, category and search filters, sortable columns, paging, and stock badges.
- Inventory receiving, stock removal, quantity adjustments, movement history, and a guard against negative stock.
- Dedicated low-stock page with per-product thresholds, filters, and quick restock action.
- Searchable demo order list, order detail dialog, editable order statuses, and explicit disclosure that payments/storefronts are not connected.
- Supplier CRUD, product associations, category and stock-movement reports, and CSV export.
- Registration and login through Supabase Auth. With no Supabase credentials, the app opens in demo mode and keeps operational data in this browser's local storage.
- Row Level Security migration and middleware that protects application routes when Supabase is configured.

## Requirements

- Node.js 20.9 or later (Next.js 15).
- npm.

## Install and run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Leave the Supabase values blank to use demo mode. Demo data is stored in local storage on the current browser and is not sent to a database. Use Settings → Data & privacy to restore the sample data.

On Windows PowerShell, make the environment file with `Copy-Item .env.example .env.local`.

## Supabase setup

1. Create a Supabase project.
2. In Supabase **SQL Editor**, run [`supabase/migrations/202611120001_stockflow.sql`](supabase/migrations/202611120001_stockflow.sql).
3. Copy the project URL and **publishable/anon key** from Project Settings → API into `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
   ```

4. In Authentication → URL Configuration, set the local Site URL to `http://localhost:3000` and add your production URL to Redirect URLs.
5. Restart `npm run dev`, then register an account. Supabase may require email confirmation depending on project settings.

The app only uses the public anon key in the browser; Row Level Security isolates every database row by `auth.uid()`. A service-role key is not needed and must never be put in `NEXT_PUBLIC_*` variables. The migration creates database tables/policies and auth profiles. When credentials are configured and a user is signed in, catalog, supplier, movement, and order status data load from and persist to Supabase. A newly registered workspace starts empty.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy to Vercel

1. Push the repository to a Git provider and import it in Vercel.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project environment variables (omit them for a demo-only deployment).
3. Ensure the migration has been run and configure the Vercel deployment URL in Supabase Auth redirect settings.
4. Deploy. Vercel detects Next.js and runs the build automatically.

## Current limitations

- Sample orders are for workflow demonstration only; payment processing, fulfillment, tax, and storefront integrations are not included.
- Supabase registration/login, route session checks, and RLS database access are included. Product, supplier, and movement operations synchronize to Supabase. Order records must be imported or created directly in the database; this UI supports searching, viewing, and updating their status. The shown account/workspace profile is illustrative.
- Historical chart values are sample trend data; the current inventory value metric is calculated from the editable catalog.
