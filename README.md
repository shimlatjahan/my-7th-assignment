a# 🛒 বাজার দর | BazarDor

### প্রয়োজনীয় পণ্যের দাম এক নজরে।

BazarDor is a Bengali-first grocery price website designed to help users explore everyday essentials, compare prices across markets, and follow daily price changes. Built with Next.js App Router and Better Auth, the project combines product browsing with authenticated access to detailed market prices.

**Assignment:** B14-A7 — Bazar Dor

| Project links | URL |
| --- | --- |
| 🌐 Live website | **Add your deployed website URL here** |
| 💻 GitHub repository | **Add your GitHub repository URL here** |

<!-- Before submission: replace the two link placeholders and verify that the feature overview below matches the completed application. -->

## ✨ Feature Overview

1. **Daily price highlights** — Separate sections for the top six price risers, top six price fallers, and all available products.
2. **Bengali product cards** — Product emoji or illustration, name, unit, current price in Bengali numerals, and a percentage-change badge. Rising, falling, and unchanged prices use green, red, and gray badges respectively.
3. **Category browsing and sorting** — Browse products by category and select default order, price low to high, or price high to low. Price sorting uses numeric values, including conversion when prices contain Bengali digits.
4. **Protected product details** — Signed-in users can view product descriptions, category tags, units, minimum/maximum/average prices, and market-specific prices.
5. **Email and social authentication** — Better Auth integration for email/password registration and login, plus Google and GitHub sign-in. Email registration sends users to the sign-in page.
6. **Profile updates** — A profile page with an update action leading to a separate form for changing the user's name.
7. **Responsive interface** — Layouts designed for mobile, tablet, and desktop, including a responsive product grid and stacked mobile hero section.
8. **Price ticker and navigation** — A scrolling price strip, Bengali date, highlighted active category, and session-aware profile/sign-out controls.
9. **Loading and feedback** — Product skeleton loaders and toast notifications for authentication, validation, and protected-route redirects.
10. **Friendly empty and error states** — Invalid products, categories, and unknown routes show a helpful message with a link back to the home page.

The hero's primary button scrolls to the **সব পণ্য** section on the current page. The footer reminds users that displayed prices are estimates and may change with market conditions.

## 🛠️ Technologies

| Technology | Purpose |
| --- | --- |
| Next.js & React | Application UI, App Router, and server/client rendering |
| TypeScript | Typed application code |
| Tailwind CSS | Responsive styling and layout |
| HeroUI | Interface components |
| Better Auth | Email/password authentication, OAuth, sessions, and user updates |
| MongoDB & MongoDB Node.js Driver | Authentication data storage |
| Better Auth MongoDB Adapter | Connecting Better Auth to MongoDB |
| React Toastify | Toast notifications in the supplied authentication pages |
| React Icons | Google, GitHub, and other interface icons |
| BazarDor REST API | Product and category data |

## 🧭 Main Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Home, price highlights, and all products | Public |
| `/category/[slug]` | Category products and sorting | Public |
| `/product/[slug]` | Product summary and market prices | Requires login |
| `/signin` | Email/password and social sign-in | Public |
| `/signup` | Registration and social sign-in | Public |

The profile and name-update pages are available through the signed-in user's navigation. Unknown routes display a friendly 404 page.

## 🚀 Run Locally

### 1. Get the project

Clone your repository and open its root folder, which contains `package.json`.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```dotenv
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace_with_a_strong_random_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

The supplied database configuration uses the database name `bazardor`. Use a MongoDB deployment that supports transactions, such as an Atlas replica set, with the supplied adapter configuration.

Generate a random Better Auth secret with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Keep `.env` out of Git. An optional `.env.example` should contain placeholder values only.

### 3. Configure OAuth callbacks

Configure the following callback URLs in the corresponding OAuth applications:

| Provider | Local callback URL |
| --- | --- |
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |

Use the same origin consistently in the browser, `BETTER_AUTH_URL`, and provider configuration. For production, replace `http://localhost:3000` with the deployed website's HTTPS origin and configure the matching provider callbacks.

Both client ID and client secret must be present for each social provider to be enabled by the supplied auth configuration.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run only one development server for this project at a time.

For a production build, use the project's standard Next.js scripts:

```bash
npm run build
npm run start
```

## 🔌 API Reference

**Primary base URL:**

```text
https://api.api-store.workers.dev/api/bazardor
```

**Alternative base URL:**

```text
https://api.abcz.workers.dev/api/bazardor
```

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/products` | All products |
| GET | `/products?category=chal` | Products filtered by category |
| GET | `/products/1` | A single product by ID |
| GET | `/categories` | All categories |
| GET | `/categories/chal` | A single category |

The API's product endpoint uses an ID; the application's product page uses the `/product/[slug]` route. Use the appropriate product identifier when requesting API data.

## 🔐 Authentication Notes

- Email/password registration does not automatically sign the user in; users are redirected to `/signin`.
- Email verification is disabled for assignment evaluation, and a forgot-password flow is outside the assignment scope.
- Social authentication returns users to the configured callback destination after successful login.
- Product details require a valid authenticated session.
- Name changes use Better Auth's `updateUser` API.

Reference: [Better Auth — Update User](https://better-auth.com/docs/concepts/users-accounts#update-user).

## ☁️ Deployment & Submission

Deploy to a Next.js-compatible hosting environment such as Vercel. Configure the production environment variables, set the production OAuth callbacks, and update the live website link above.

Before submitting:

- [ ] Confirm that all listed features match the deployed application.
- [ ] Verify at least **8 meaningful Git commits**.
- [ ] Test mobile, tablet, and desktop layouts against the provided Figma.
- [ ] Test email registration/login, Google login, GitHub login, logout, and profile-name updates.
- [ ] Confirm that protected product pages require authentication.
- [ ] Check skeleton loaders, toast feedback, Bengali price sorting, and friendly 404 states.
- [ ] Refresh valid category and product URLs directly on the deployed site.
- [ ] Add both the **Live Link** and **GitHub Repository Link**.

> সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
