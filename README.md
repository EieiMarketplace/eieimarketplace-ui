This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn install
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## To Call API (With Axios)

- Look Example at /Home/page.tsx (This will help you no need to call server Session)

## Authorization

- add page in Middleware
- Role interceptor check will implement in the future \*\*\*\*

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
my-nextjs-project/
│── public/            # Static assets (images, fonts, etc.)
│── src/               # Main source code
│   ├── components/    # Reusable UI components
│   ├── styles/        # Global styles (CSS, SCSS, Tailwind, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Helper functions and utilities
│   ├── context/       # Context API for global state management
│   ├── services/      # API calls and data fetching logic
│   ├── store/         # Redux or Zustand store (if using  environment variables)
│   ├── constants/     # Constant values (e.g., roles, URLs, static data)
│── .local.env               # Environment variables
│── next.config.js     # Next.js configuration
│── package.json       # Project metadata and dependencies
│── README.md          # Project documentation
│── tsconfig.json      # TypeScript configuration (if using TypeScript)
```
