# Supabase Notes SaaS

A full-stack SaaS application built with **Next.js** and **Supabase**.

This project is designed as a practical way to learn how to build a modern SaaS application around Supabase, covering authentication, PostgreSQL, Row Level Security, Storage and Realtime.

The application allows authenticated users to create, manage and organize notes, with optional cover images stored securely in Supabase Storage.

---

## 🚀 Tech Stack

- **Next.js** — App Router
- **React**
- **TypeScript**
- **Tailwind CSS 3**
- **Supabase**
     - Authentication
     - PostgreSQL
     - Row Level Security (RLS)
     - Storage
     - Realtime

---

## ✨ Features

### Authentication

- User registration
- User login
- User logout
- Protected application routes
- Server-side authentication
- Supabase Auth session management

### Notes

- Create notes
- Edit notes
- Delete notes
- Display user's own notes
- Automatic timestamps
- User/Note relationship through PostgreSQL

### File Management

- Upload note cover images
- Store files in a private Supabase Storage bucket
- Generate signed URLs to display private images
- Associate uploaded images with notes
- Delete associated files when a note is removed

### Database & Security

- PostgreSQL database
- Foreign key relationship between notes and users
- Row Level Security policies
- Users can only access their own notes
- Database configuration managed through migrations

### Realtime

- Supabase Realtime integration
- Listen for PostgreSQL changes
- React to `INSERT`, `UPDATE` and `DELETE` events
- Refresh the application when notes change

---

## 🗄️ Database

The main table used by the application is `public.notes`.

```text
notes
├── id
├── user_id
├── title
├── content
├── created_at
├── updated_at
└── cover_image_path
```

Each note belongs to a Supabase authenticated user through the `user_id` foreign key.

The database uses **Row Level Security** to ensure that users can only access their own notes.

For example:

```sql
auth.uid() = user_id
```

The RLS policies cover:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`

---

## 📦 Supabase Storage

The application uses a private Storage bucket named:

```text
note-covers
```

Cover images are stored using a path associated with the authenticated user and the corresponding note.

Because the bucket is private, the application generates temporary signed URLs when an image needs to be displayed.

```text
Supabase Storage
      ↓
private bucket
      ↓
createSignedUrl()
      ↓
temporary URL
      ↓
Next.js Image
```

---

## ⚡ Realtime

The `notes` table is enabled for Supabase Realtime.

The application listens for PostgreSQL changes:

```text
INSERT
UPDATE
DELETE
```

When a change is detected, the Next.js application refreshes the relevant Server Components so that the UI reflects the latest database state.

---

## 🔐 Security

Security is handled primarily by Supabase and PostgreSQL rather than by the UI.

The project uses:

- Supabase Auth for authentication
- PostgreSQL foreign keys for data integrity
- Row Level Security for authorization
- Private Storage buckets for uploaded files
- Signed URLs for temporary access to private images

The application never relies solely on client-side checks to protect user data.

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Adlax/supabase-notes-saas.git

cd supabase-notes-saas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with the credentials from your Supabase project.

> Never expose your Supabase `service_role` key in client-side code or commit it to the repository.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🧬 Database Migrations

Database structure and Supabase configuration can be reproduced using Supabase migrations.

Create a new migration:

```bash
npx supabase migration new migration_name
```

Apply migrations to the linked Supabase project:

```bash
npx supabase db push
```

This allows the database configuration to live alongside the application source code and makes it possible to reproduce the project from scratch.

---

## 📁 Project Structure

A simplified version of the project structure:

```text
.
├── app/
│   ├── (auth)/
│   ├── (private)/
│   ├── error.tsx
│   └── ...
│
├── components/
│   └── ...
│
├── lib/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── ...
│
├── supabase/
│   └── migrations/
│
├── public/
│   └── ...
│
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 🎓 What You'll Learn

This project can be used as a practical introduction to building a SaaS application with Supabase.

The project covers the following progression:

```text
Next.js project
      ↓
Supabase setup
      ↓
Authentication
      ↓
PostgreSQL
      ↓
Row Level Security
      ↓
Frontend / UI
      ↓
Storage
      ↓
File management
      ↓
Realtime
      ↓
Error handling & finishing touches
```

The goal is not simply to connect Supabase to Next.js, but to understand how the different Supabase services work together in a real application.

---

## 📚 Course Topics

The project is structured around several practical chapters:

1. Project scaffolding and setup
2. Supabase project configuration
3. Authentication and user management
4. PostgreSQL & Row Level Security
5. Frontend and UI
6. Supabase Storage
7. File management
8. Realtime
9. Error handling and final improvements

---

## 🧪 Testing

Before considering the application complete, the main user flow can be tested from start to finish:

```text
Sign up
  ↓
Login
  ↓
Create a note
  ↓
Upload a cover image
  ↓
Edit the note
  ↓
Verify Realtime updates
  ↓
Delete the note
  ↓
Verify the associated image is removed
  ↓
Logout
  ↓
Login again
```

Security should also be tested by verifying that one authenticated user cannot access or modify another user's notes.

---

## 📌 Purpose of the Project

This repository accompanies a practical learning project focused on **Supabase with Next.js**.

The objective is to understand the complete lifecycle of a modern SaaS application:

- authentication
- database design
- authorization
- file storage
- realtime updates
- server/client interaction
- application security

Rather than treating Supabase features independently, the project demonstrates how they work together inside a real application.

---

## 📄 License

This project is intended for educational purposes.
