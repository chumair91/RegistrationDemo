# Registration & User Management System

A modern full-stack authentication and user profile management application built with **Next.js 15**, **NextAuth.js**, **MongoDB**, and **TypeScript**.

## ✨ Features

### Authentication

- **Email/Password Registration** - Secure user registration with password hashing (bcrypt)
- **Email/Password Login** - Credential-based authentication
- **Google OAuth** - One-click login with Google
- **JWT Sessions** - Secure token-based sessions with NextAuth.js

### User Management

- **Profile Editing** - Update name and profile information
- **Image Upload** - Upload and store profile images on Cloudinary CDN
- **User Context** - Global user state management with React Context
- **Session Persistence** - Persistent authentication across sessions

## 🛠️ Tech Stack

### Frontend

- [Next.js 15](https://nextjs.org) - React framework
- [React 19](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Axios](https://axios-http.com) - HTTP client
- [Sonner](https://sonner.emilkowal.ski) - Toast notifications
- [React Icons](https://react-icons.github.io/react-icons) - Icon library

### Backend

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Serverless APIs
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [MongoDB](https://www.mongodb.com) - NoSQL database
- [Mongoose](https://mongoosejs.com) - ODM for MongoDB
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [Cloudinary](https://cloudinary.com) - Image storage and CDN

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Cloudinary account
- Google OAuth credentials

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd registrationproject
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXT_AUTH_SECRET=your_secret_key
NEXT_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/[...nextauth]/ # NextAuth authentication
│   ├── register/           # User registration
│   ├── edit/               # Profile update
│   └── user/               # User endpoints
├── context/                # React Context (UserContext)
├── lib/                    # Utilities & config
│   ├── auth.ts            # NextAuth configuration
│   ├── db.ts              # MongoDB connection
│   └── cloudinary.ts      # Cloudinary upload
├── model/                  # MongoDB schemas
│   └── user.model.ts      # User model
├── register/               # Registration page
├── login/                  # Login page
├── edit/                   # Profile edit page
└── layout.tsx             # Root layout
public/                     # Static assets
```

## 📝 API Routes

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | `/api/auth/register`      | Register new user   |
| POST   | `/api/auth/[...nextauth]` | NextAuth handler    |
| POST   | `/api/edit`               | Update user profile |
| GET    | `/api/user`               | Get current user    |

## 🔐 Authentication Flow

1. User registers with email/password or logs in with Google
2. Credentials verified against MongoDB
3. NextAuth creates JWT token and session
4. Session stored in secure HTTP-only cookie
5. User context updated with session data

## 🎨 Pages

- **`/register`** - User registration page
- **`/login`** - User login page
- **`/edit`** - Edit user profile (protected)
- **`/`** - Home page

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## 🔄 Session Update

After editing the user profile, the session is automatically updated via the NextAuth `update()` function to reflect changes across the application.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a modern user authentication and profile management system.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
