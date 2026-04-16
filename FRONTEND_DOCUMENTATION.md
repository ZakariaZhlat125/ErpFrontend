# ERP V2 — Frontend Documentation

> **Generated:** April 14, 2026
> **Source:** Tamed.sa ERP analysis + ERP V2 Blueprint Pack
> **Stack:** Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + Ant Design 6
> **Pattern:** Mini App Feature Design Pattern

---

## 1. Overview

The ERP V2 frontend is a **standalone Next.js 16 App Router** application. It uses a **Mini App Feature** architecture where every module (Finance, HR, Inventory, Projects, etc.) is an isolated feature component rendered by a thin Next.js page file.

### Philosophy
- Each module is a self-contained "mini app" inside `features/`
- Next.js App Router pages are **thin wrappers** — they import and render the feature component only
- **Neumorphic design system** with full light/dark mode token support
- Arabic/RTL-first with English support via `next-intl`
- Multi-establishment context baked into the URL (`/[locale]/[establishmentId]/[module]`)

---

## 2. Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Runtime** | React 19 |
| **Language** | TypeScript 5 |
| **UI Library** | Ant Design (antd) v6 + @ant-design/icons |
| **Styling** | Tailwind CSS 4 + custom Neumorphic CSS utilities |
| **Design Tokens** | Custom token system (`src/lib/theme/tokens.ts`) |
| **State Management** | Zustand v5 (theme store, persisted) |
| **Server Data** | TanStack React Query v5 |
| **Forms** | React Hook Form + Zod |
| **i18n** | next-intl v4 (namespace auto-loading) |
| **Charts** | Recharts |
| **Date utilities** | dayjs |
| **Animations** | GSAP |
| **HTTP client** | Axios |
| **Auth** | next-auth v4 |
| **Build tool** | Next.js built-in (Turbopack/Webpack) |

---

## 3. Project Folder Structure

```text
fonrtend/
├── app/                                        # Next.js App Router
│   ├── layout.tsx                              # Root layout: ThemeProvider + NextIntlClientProvider + <html dir>
│   ├── page.tsx                                # Root redirect
│   ├── globals.css                             # Global styles + neumorphic CSS utilities
│   │
│   └── [locale]/                               # Locale segment — en | ar
│       ├── layout.tsx                          # AppShell layout (conditional sidebar/topbar per path)
│       ├── page.tsx                            # Locale root redirect
│       │
│       ├── login/page.tsx                      # → features/Auth/LoginForm.tsx
│       ├── register/page.tsx                   # → features/Auth/RegisterForm.tsx
│       ├── forget-password/page.tsx            # → features/Auth/ForgetPasswordForm.tsx
│       ├── reset-password/page.tsx             # → features/Auth/ResetPasswordForm.tsx
│       ├── landing/page.tsx                    # → features/Landing/LandingPage.tsx
│       ├── my-establishment/page.tsx           # → features/MyEstablishment/MyEstablishment.tsx
│       ├── company/page.tsx                    # → features/Company/CompanyManagement.tsx
│       ├── profile/page.tsx                    # → features/Profile/ProfileSettings.tsx
│       │
│       └── [establishmentId]/                  # Per-establishment context (dynamic segment)
│           ├── dashboard/page.tsx              # → features/Home/Dashboard.tsx
│           ├── finance/page.tsx                # → features/Finance/FinanceDashboard.tsx
│           ├── hr/page.tsx                     # → features/HR/HRDashboard.tsx
│           ├── inventory/page.tsx              # → features/Inventory/InventoryDashboard.tsx
│           ├── projects/page.tsx               # → features/Projects/ProjectsDashboard.tsx
│           ├── reports/page.tsx                # → features/Reports/ReportsDashboard.tsx
│           └── settings/page.tsx              # → features/Settings/SettingsDashboard.tsx
│
├── features/                                   # Mini App Feature Pattern — one component per mini-app
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgetPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── locales/                            # Feature-specific translations
│   │       ├── en/
│   │       │   └── auth.json
│   │       └── ar/
│   │           └── auth.json
│   ├── Landing/
│   │   └── LandingPage.tsx
│   ├── MyEstablishment/
│   │   └── MyEstablishment.tsx                 # Establishment picker + quick access
│   ├── Company/
│   │   └── CompanyManagement.tsx
│   ├── Profile/
│   │   └── ProfileSettings.tsx
│   ├── Home/
│   │   └── Dashboard.tsx                       # Main ERP dashboard (KPIs, activity)
│   ├── Finance/
│   │   └── FinanceDashboard.tsx
│   ├── HR/
│   │   └── HRDashboard.tsx
│   ├── Inventory/
│   │   └── InventoryDashboard.tsx
│   ├── Projects/
│   │   └── ProjectsDashboard.tsx
│   ├── Reports/
│   │   └── ReportsDashboard.tsx
│   └── Settings/
│       └── SettingsDashboard.tsx
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx                    # Root shell: Sidebar + TopBar + <main>
│   │   │   ├── Sidebar.tsx                     # Collapsible neumorphic sidebar with module nav
│   │   │   └── TopBar.tsx                      # Header: search, theme toggle, notifications, user menu
│   │   ├── ui/
│   │   │   ├── Button.tsx                      # Neumorphic button (primary|secondary|success|warning|danger|ghost)
│   │   │   ├── Card.tsx                        # Neumorphic card container
│   │   │   └── Input.tsx                       # Form input with label support
│   │   ├── forms/                              # (planned) form-specific components
│   │   └── tables/                             # (planned) table components
│   │
│   ├── lib/
│   │   ├── hooks/
│   │   │   └── useLocaleDirection.ts           # Returns 'rtl' | 'ltr' from active locale
│   │   ├── i18n/
│   │   │   ├── request.ts                      # next-intl server config — auto-loads all namespace JSON files
│   │   │   └── getTranslations.ts              # Helper for server component translations
│   │   ├── theme/
│   │   │   ├── tokens.ts                       # Light/dark color tokens + neumorphic shadow definitions
│   │   │   ├── theme-store.ts                  # Zustand store (persisted to localStorage)
│   │   │   ├── theme-provider.tsx              # Client provider wrapping the app
│   │   │   └── use-theme.ts                    # useTheme() → { tokens, mode, toggleTheme, setTheme }
│   │   └── utils/
│   │       └── cn.ts                           # cn() — clsx + tailwind-merge helper
│   │
│   └── locales/
│       ├── ar/
│       │   ├── public.json
│       │   ├── home.json
│       │   └── dashboard.json
│       └── en/
│           ├── public.json
│           ├── home.json
│           └── dashboard.json
│
├── middleware.ts                               # next-intl locale routing (always-prefix: /en/… | /ar/…)
├── next.config.ts                             # Next.js config with next-intl plugin
├── package.json
└── tsconfig.json
```

---

## 4. Page Inventory

### 4.1 Authentication
| Route | Page | Description |
|-------|------|-------------|
| `/login` | `auth/Login.tsx` | Username + password login |
| `/forgot-password` | `auth/ForgotPassword.tsx` | Password reset |

### 4.2 Dashboard
| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | `dashboard/Index.tsx` | KPI cards, charts, receivables, stock alerts, recent activity |

### 4.3 Users & Roles
| Route | Page | Description |
|-------|------|-------------|
| `/users` | `users/Index.tsx` | User list with search and role filter |
| `/users/create` | `users/Create.tsx` | Create user, assign role |
| `/users/{id}/edit` | `users/Edit.tsx` | Edit user and permissions |
| `/roles` | `roles/Index.tsx` | Role list |
| `/roles/{id}/permissions` | `roles/Permissions.tsx` | Assign module permissions to role |

### 4.4 Parties (Customers / Suppliers / Agents)
| Route | Page | Description |
|-------|------|-------------|
| `/parties` | `parties/Index.tsx` | Unified list with role filter |
| `/parties/create` | `parties/Form.tsx` | Create party with contacts and addresses |
| `/parties/{id}` | `parties/Show.tsx` | Detail with tabs: Contacts, Addresses, Invoices, Statement |
| `/parties/{id}/edit` | `parties/Form.tsx` | Edit party |

### 4.5 Accounting — Invoices
| Route | Page | Description |
|-------|------|-------------|
| `/accounting/invoices` | `accounting/invoices/Index.tsx` | List with type/status/date filters |
| `/accounting/invoices/create` | `accounting/invoices/Form.tsx` | Create invoice with line items, tax, discount |
| `/accounting/invoices/{id}` | `accounting/invoices/Show.tsx` | Detail: approve, payment history, PDF preview |
| `/accounting/invoices/{id}/edit` | `accounting/invoices/Form.tsx` | Edit draft invoice |

### 4.6 Accounting — Payments
| Route | Page | Description |
|-------|------|-------------|
| `/accounting/payments` | `accounting/payments/Index.tsx` | Payment list |
| `/accounting/payments/create` | `accounting/payments/Form.tsx` | Record payment, allocate to invoice |
| `/accounting/payments/{id}` | `accounting/payments/Show.tsx` | Payment detail |

### 4.7 Accounting — Chart of Accounts
| Route | Page | Description |
|-------|------|-------------|
| `/accounting/accounts` | `accounting/accounts/Index.tsx` | Hierarchical tree view |
| `/accounting/accounts/create` | `accounting/accounts/Form.tsx` | Add account (type, parent, code) |
| `/accounting/accounts/{id}/statement` | `accounting/accounts/Statement.tsx` | Account ledger with date filter |

### 4.8 Accounting — Reports
| Route | Description |
|-------|-------------|
| `/accounting/reports/trial-balance` | Trial balance by date range |
| `/accounting/reports/income-statement` | Profit & loss |
| `/accounting/reports/balance-sheet` | Balance sheet |
| `/accounting/reports/cash-flows` | Cash flow statement |
| `/accounting/reports/ledger` | General ledger |
| `/accounting/reports/receivables` | Customer receivables aging |
| `/accounting/reports/payables` | Supplier payables aging |
| `/accounting/reports/tax-return` | VAT (15%) tax return |
| `/accounting/reports/daily` | Daily transactions report |
| `/accounting/reports/commissions` | Commission report |
| `/accounting/reports/employee-salaries` | Salary summary report |

### 4.9 Inventory — Products & Categories
| Route | Page | Description |
|-------|------|-------------|
| `/inventory/products` | `inventory/products/Index.tsx` | Product list with search, category, type filter |
| `/inventory/products/create` | `inventory/products/Form.tsx` | Create product or service |
| `/inventory/products/{id}` | `inventory/products/Show.tsx` | Detail: stock by warehouse, price, tax |
| `/inventory/products/{id}/edit` | `inventory/products/Form.tsx` | Edit product |
| `/inventory/categories` | `inventory/categories/Index.tsx` | Product categories (tree) |
| `/inventory/units` | `inventory/units/Index.tsx` | Units of measurement |

### 4.10 Inventory — Warehouses & Stock
| Route | Page | Description |
|-------|------|-------------|
| `/inventory/warehouses` | `inventory/warehouses/Index.tsx` | Warehouse list |
| `/inventory/warehouses/{id}` | `inventory/warehouses/Show.tsx` | Warehouse stock balances |
| `/inventory/stock-balances` | `inventory/stock-balances/Index.tsx` | Stock levels by product/warehouse |
| `/inventory/stock-movements` | `inventory/stock-movements/Index.tsx` | Movement history log |
| `/inventory/stock-movements/create` | `inventory/stock-movements/Form.tsx` | Manual adjustment |
| `/inventory/stock-counts` | `inventory/stock-counts/Index.tsx` | Physical count list |
| `/inventory/stock-counts/create` | `inventory/stock-counts/Form.tsx` | Start new count |
| `/inventory/stock-counts/{id}` | `inventory/stock-counts/Review.tsx` | Review variances, approve |
| `/inventory/transfers` | `inventory/transfers/Index.tsx` | Inter-warehouse transfers |
| `/inventory/transfers/create` | `inventory/transfers/Form.tsx` | Create transfer |

### 4.11 HR — Employees
| Route | Page | Description |
|-------|------|-------------|
| `/hr/employees` | `hr/employees/Index.tsx` | Employee list with department/status filter |
| `/hr/employees/create` | `hr/employees/Form.tsx` | Full employee profile creation |
| `/hr/employees/{id}` | `hr/employees/Show.tsx` | Tabs: Attendance, Leaves, Payroll, Documents |
| `/hr/employees/{id}/edit` | `hr/employees/Form.tsx` | Edit employee |

### 4.12 HR — Attendance
| Route | Page | Description |
|-------|------|-------------|
| `/hr/attendance` | `hr/attendance/Index.tsx` | Attendance records by date/employee |
| `/hr/attendance/import` | `hr/attendance/Import.tsx` | Import from Excel or device |
| `/hr/attendance/report` | `hr/attendance/Report.tsx` | Monthly attendance summary |

### 4.13 HR — Leaves
| Route | Page | Description |
|-------|------|-------------|
| `/hr/leaves` | `hr/leaves/Index.tsx` | Leave requests with status filter |
| `/hr/leaves/create` | `hr/leaves/Form.tsx` | Submit leave request |
| `/hr/leaves/{id}` | `hr/leaves/Show.tsx` | Detail with approve/reject actions |

### 4.14 HR — Payroll
| Route | Page | Description |
|-------|------|-------------|
| `/hr/payroll` | `hr/payroll/Index.tsx` | Payroll run history |
| `/hr/payroll/create` | `hr/payroll/Form.tsx` | Create payroll run for a period |
| `/hr/payroll/{id}` | `hr/payroll/Review.tsx` | Review per-employee lines, adjust, approve |

### 4.15 Projects
| Route | Page | Description |
|-------|------|-------------|
| `/projects` | `projects/Index.tsx` | Project list with status filter |
| `/projects/create` | `projects/Form.tsx` | Create project |
| `/projects/{id}` | `projects/Show.tsx` | Detail: Members, Tasks, Time Entries, Documents |
| `/projects/{id}/tasks` | `projects/tasks/Board.tsx` | Kanban/list task view |
| `/projects/{id}/time-entries` | `projects/time-entries/Index.tsx` | Time log |

### 4.16 Settings
| Route | Page | Description |
|-------|------|-------------|
| `/settings/general` | `settings/General.tsx` | Organization info, logo, currency, timezone, locale |
| `/settings/roles` | `settings/Roles.tsx` | Role & permission management |
| `/settings/payment-terms` | `settings/PaymentTerms.tsx` | Payment term templates |
| `/settings/salary-components` | `settings/SalaryComponents.tsx` | Payroll earning/deduction definitions |
| `/settings/tax-rates` | `settings/TaxRates.tsx` | VAT and other tax rates |

---

## 5. Layout System

### AppLayout (Authenticated)
```tsx
<div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="flex min-h-screen bg-gray-50">
  <Sidebar />
  <div className="flex flex-col flex-1">
    <Header />
    <main className="flex-1 p-6">
      <Breadcrumb />
      {children}
    </main>
  </div>
</div>
```

**Sidebar features:**
- Permission-filtered navigation items
- Collapsible with icon-only mode
- Active route highlighting
- Module grouping (Accounting, Inventory, HR, Projects…)
- Organization name + logo at top
- User menu at bottom (profile, logout)

**Header features:**
- Page title
- Notification bell with unread count
- Language switcher (AR / EN)
- User avatar + dropdown

---

## 6. Shared Components

### 6.1 DataTable
Server-side paginated, sortable, filterable table used on every list page.

```tsx
<DataTable
  columns={columns}
  data={invoices.data}
  meta={invoices.meta}
  onSort={(col, dir) => router.get(url, { sort: col, direction: dir })}
  filters={<InvoiceFilters />}
  bulkActions={selected => <BulkDelete selected={selected} />}
  exportUrl="/accounting/invoices/export"
/>
```

### 6.2 InlineLineItems
Dynamic row editor used in Invoice and Quotation creation forms.

**Columns:** Description, Qty, Unit Price, Discount, Tax Rate, Line Total (auto)
**Footer totals:** Subtotal, Discount, Tax (15%), Grand Total

### 6.3 StatusBadge
```tsx
// Maps entity status → color variant
<StatusBadge status="overdue" />
// draft → gray | approved → blue | paid → green | overdue → red | cancelled → slate
```

### 6.4 SearchableSelect
Async typeahead for related records (parties, products, employees, accounts).
```tsx
<SearchableSelect
  endpoint="/api/v1/parties"
  labelKey="display_name"
  valueKey="id"
  placeholder="Search parties..."
  value={partyId}
  onChange={setPartyId}
/>
```

### 6.5 CurrencyInput
SAR-formatted number input with thousands separator and decimal precision.

### 6.6 FileUploader
Polymorphic attachment uploader. Uploads to S3 via signed URL. Supports multiple files, preview, and progress bar.

### 6.7 ConfirmDialog
Used for all destructive/approval actions (approve invoice, delete record, process payroll).

### 6.8 ActivityTimeline
Vertical timeline of audit events with actor, action, timestamp, and diff.

### 6.9 KPICard
```tsx
<KPICard
  label="Total Receivables"
  value={formatCurrency(stats.receivables)}
  trend={{ value: 12, direction: 'up' }}
  icon={<ReceiptIcon />}
/>
```

---

## 7. Form Patterns

### 7.1 Simple Forms (Inertia useForm)
Used for most CRUD forms (parties, employees, products, warehouses).

```tsx
const { data, setData, post, processing, errors } = useForm({
  display_name: '',
  tax_number: '',
  type: 'company',
});

const submit = (e: FormEvent) => {
  e.preventDefault();
  post(route('parties.store'));
};
```

### 7.2 Complex Forms (React Hook Form + Zod)
Used for Invoice, Payroll Review, Stock Count — forms with dynamic rows and dependent calculations.

```tsx
const schema = z.object({
  party_id: z.string().uuid(),
  issue_date: z.string().min(1),
  lines: z.array(z.object({
    description: z.string().min(1),
    quantity: z.number().positive(),
    unit_price: z.number().nonnegative(),
    discount_amount: z.number().default(0),
    tax_rate_id: z.string().uuid().nullable(),
  })).min(1),
});

const form = useForm<InvoiceFormData>({
  resolver: zodResolver(schema),
});
```

### 7.3 Form Rules
- Server validation errors always displayed inline under each field
- Client-side validation for immediate feedback only — backend is the source of truth
- Destructive actions always guarded by `ConfirmDialog`
- Forms show a spinner on `processing` / `isSubmitting`
- Invoice and Quotation support "Save as Draft" vs "Approve"

---

## 8. State Management

| Concern | Approach |
|---------|---------|
| Server data | Inertia page props (from Laravel controllers) |
| Form state | Inertia `useForm` or React Hook Form |
| UI/local state | React `useState` / `useReducer` |
| Auth user | Inertia shared data `auth.user` via `usePage()` |
| Filters/URL | URL query params via `router.get()` |
| Notifications | Laravel Echo + Pusher (WebSocket) |

> No global state manager (Redux/Zustand) is needed in V1. Inertia's server-driven model eliminates most client-side state concerns.

---

## 9. Authentication & Permissions

### Auth Data Access
```tsx
import { usePage } from '@inertiajs/react';

const { auth } = usePage<PageProps>().props;
// auth.user = { id, name, email, roles: string[], permissions: string[] }
```

### usePermission Hook
```ts
// hooks/usePermission.ts
export function usePermission() {
  const { auth } = usePage<PageProps>().props;
  return {
    can: (permission: string) => auth.user.permissions.includes(permission),
    hasRole: (role: string) => auth.user.roles.includes(role),
  };
}
```

### Usage in Components
```tsx
const { can } = usePermission();

// Sidebar — hide items without access
{ can('invoices:read') && <NavItem href="/accounting/invoices" label="Invoices" /> }

// Action buttons — hide without write permission
{ can('invoices:write') && (
  <Button onClick={handleApprove}>Approve Invoice</Button>
)}
```

### Permission Naming Convention
Pattern: `{module}:{action}` or `{module}:{submodule}:{action}`

| Permission | Description |
|-----------|-------------|
| `invoices:read` | View invoice list and details |
| `invoices:write` | Create and edit draft invoices |
| `invoices:approve` | Approve invoices (posts journal entries) |
| `hr:employees:read` | View employee list |
| `hr:payroll:approve` | Approve payroll runs |
| `inventory:stock-count:approve` | Approve physical counts |
| `accounting:reports:read` | Access financial reports |
| `settings:write` | Modify system settings |

> UI hiding is for UX only. Laravel Policies and Gates enforce authorization server-side for every request.

---

## 10. i18n & RTL Support

### Configuration
```ts
// app.tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: document.documentElement.lang ?? 'ar',
  fallbackLng: 'en',
  resources: {
    ar: { translation: arTranslations },
    en: { translation: enTranslations },
  },
});
```

### RTL Direction
```tsx
// AppLayout.tsx
const locale = usePage<PageProps>().props.locale;
<body dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
```

### Formatting Utilities
```ts
// lib/currency.ts
export const formatCurrency = (amount: number, locale = 'ar-SA') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'SAR' }).format(amount);

// lib/date.ts
export const formatDate = (date: string, locale = 'ar-SA') =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date));

// lib/phone.ts
export const formatSaudiPhone = (phone: string) =>
  phone.replace(/^(9665|05)(\d{8})$/, '05$2');
```

### Translation Usage
```tsx
const { t } = useTranslation();
<h1>{t('invoices.list.title')}</h1>
<Button>{t('common.actions.create')}</Button>
```

### Feature-Specific Locale Structure
Each feature can have its own locale files in addition to the global `src/locales`:

```
features/
├── Auth/
│   └── locales/
│       ├── en/
│       │   └── auth.json
│       └── ar/
│           └── auth.json
├── Finance/
│   └── locales/
│       ├── en/
│       │   └── finance.json
│       └── ar/
│           └── finance.json
```

**How it works:**
- The i18n system automatically scans both `src/locales/{locale}` and `features/{feature}/locales/{locale}`
- Translations from feature folders are loaded alongside global translations
- Feature-specific translations override global ones if there are key conflicts
- Use the feature name as the namespace when loading translations

**Example usage in a component:**
```tsx
import { getTranslations } from '@/lib/i18n/getTranslations';

export default async function LoginForm() {
  const t = await getTranslations(['auth', 'public']);
  
  return (
    <form>
      <h1>{t('login.title')}</h1> {/* From auth.json */}
      <button>{t('submit')}</button> {/* Falls back to public.json */}
    </form>
  );
}
```

**Adding translations to a new feature:**
1. Create `features/{FeatureName}/locales/en/{featureName}.json`
2. Create `features/{FeatureName}/locales/ar/{featureName}.json`
3. Add translation keys following the same structure as global locales
4. The system will automatically detect and load these files

---

## 11. Dashboard Design

### Main Dashboard (`/dashboard`)

```
┌──────────────────────────────────────────────────────┐
│  KPI Row                                             │
│  [Receivables]  [Overdue Invoices]  [Revenue MTD]   │
│  [Stock Alerts] [Today Attendance]  [Open Projects] │
├─────────────────────────┬────────────────────────────┤
│  Revenue Chart          │  Recent Invoices           │
│  (Line - 12 months)     │  (Last 5, with status)     │
├─────────────────────────┼────────────────────────────┤
│  Top Parties            │  Low Stock Alerts          │
│  (by receivable balance)│  (products below alert qty)│
├─────────────────────────┴────────────────────────────┤
│  Recent Activity Feed (last 10 audit events)         │
└──────────────────────────────────────────────────────┘
```

### Module-level Dashboards
Each major module has its own summary at its root route:
- `/accounting` — overdue invoices, unposted entries, payables summary
- `/inventory` — low-stock products, pending stock counts, warehouse summary
- `/hr` — today's attendance, pending leaves, next payroll date
- `/projects` — active projects, overdue tasks, recent time entries

---

## 12. Key Screen Flows

### 12.1 Create & Approve Invoice
```
1.  /accounting/invoices/create
2.  Select party → SearchableSelect (async)
3.  Set issue_date, due_date, payment_term
4.  Add line items (InlineLineItems):
      product (optional) | description | qty | unit_price | discount | tax_rate
      → Line total auto-calculated
5.  Totals: subtotal → discount → tax (15%) → grand total
6.  Save as Draft OR Submit
7.  Redirect → /accounting/invoices/{id}
8.  Click "Approve" → ConfirmDialog → POST /invoices/{id}/approve
    → Backend posts journal entries, status becomes Approved
9.  Record Payment → POST /payments
    → Allocated to invoice, status becomes Paid
```

### 12.2 Payroll Processing
```
1.  /hr/payroll/create → select period (month/year)
2.  Backend generates payroll lines:
      base_salary + allowances + bonuses - deductions - advances
3.  Review page shows per-employee breakdown
4.  Make manual adjustments if needed
5.  Click "Approve" → ConfirmDialog → POST /hr/payroll-runs/{id}/approve
    → Creates journal batch in Accounting
    → Status: Posted
```

### 12.3 Physical Stock Count
```
1.  /inventory/stock-counts/create → select warehouse
2.  System loads all products with system_qty
3.  Enter counted_qty per product (inline editable)
4.  System highlights variance rows (green/red)
5.  Click "Approve Adjustments" → ConfirmDialog
    → Creates stock_movements for each variance
    → Updates stock_balances
```

---

## 13. Design System

### Color Roles
| Role | Tailwind Class | Usage |
|------|---------------|-------|
| Primary action | `bg-blue-600` | Create, Save, Submit buttons |
| Success / Paid | `bg-green-600` | Paid status, success toasts |
| Warning / Partial | `bg-yellow-500` | Partially paid, pending |
| Danger | `bg-red-600` | Overdue, delete, cancel |
| Neutral | `bg-gray-500` | Draft, disabled states |
| Info | `bg-indigo-500` | Approved, in-progress |

### Typography
- Page headings: `text-2xl font-semibold text-gray-900`
- Section headings: `text-lg font-medium text-gray-800`
- Labels: `text-sm font-medium text-gray-700`
- Body: `text-sm text-gray-600`

### Spacing & Density
ERP is information-dense by design:
- Table rows: compact (`py-2 px-4`)
- Form sections: `space-y-4` with clear group labels
- Cards: `p-6` with `divide-y` for related groups

### Status Badge Colors
```tsx
const statusColors = {
  draft:           'bg-gray-100 text-gray-700',
  approved:        'bg-blue-100 text-blue-700',
  partially_paid:  'bg-yellow-100 text-yellow-700',
  paid:            'bg-green-100 text-green-700',
  overdue:         'bg-red-100 text-red-700',
  cancelled:       'bg-slate-100 text-slate-600',
  pending:         'bg-orange-100 text-orange-700',
  posted:          'bg-indigo-100 text-indigo-700',
};
```

---

## 14. Performance Guidelines

| Concern | Approach |
|---------|---------|
| List data | Server-side pagination (default 15 rows/page) |
| Heavy reports | Queued generation + download link |
| Large selects | Async search (SearchableSelect), not full list load |
| Charts | Load only on-demand, memoize data |
| Lazy loading | Dynamic `import()` for large pages (POS, reports) |
| Images | Serve from S3 with CDN-compatible URLs |

---

## 15. Error & Empty States

Every list and detail page must handle:

| State | Component | Behavior |
|-------|-----------|---------|
| **Loading** | `LoadingSpinner` | Skeleton rows or spinner |
| **Empty** | `EmptyState` | Friendly message + primary CTA button |
| **Error** | `ErrorState` | Error message + retry button |
| **Not Found** | 404 page | Clear message, back link |
| **Forbidden** | 403 page | Permission denied message |
| **Success** | Toast notification | `toast.success('Invoice created')` |
| **Validation Error** | Inline field errors | Red text under each invalid field |

---

## 16. Environment Variables (Frontend-relevant)

```env
VITE_APP_NAME="ERP V2"
VITE_APP_URL=https://erp.example.com
VITE_API_BASE_URL=/api/v1

# Pusher (real-time notifications)
VITE_PUSHER_APP_KEY=
VITE_PUSHER_APP_CLUSTER=mt1

# Default locale
VITE_DEFAULT_LOCALE=ar
```

---

## 17. Demo UX Script (First Presentation)

The following flow should be fully supported by the UI for a first demo:

1. Login as Organization Admin
2. View dashboard (KPIs, charts)
3. Create a Party (customer + supplier roles)
4. Create a Product and assign to a Warehouse
5. Create an Invoice with line items, review totals
6. Approve the Invoice → view journal entries created
7. Record a Payment → invoice shows as Paid
8. View Trial Balance report
9. Record a Stock Movement → view updated balance
10. Create an Employee → record attendance → run payroll
11. Create a Project → add Task → log Time Entry

---

## 18. Out of Scope for V1 Frontend

- Mobile app / PWA / offline mode
- Custom dashboard builder or drag-and-drop
- Rich text invoice template designer
- Chat / WhatsApp / SMS UI (deferred to Phase 5)
- Marketplace / Tender posting UI (deferred to Phase 6)
- POS cashier full-screen interface (deferred after core inventory)
- Multi-currency display per-line (single currency SAR in V1)
