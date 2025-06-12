# FilerMan

FilerMan is a simple file sharing service built with **Next.js** and **TypeScript**. It lets users upload multiple files and share them either via an email invitation or by generating a unique link. Files can optionally be locked to specific users so only authorised email addresses are able to download them.

The project contains a minimal demonstration of how to implement a file sharing workflow using modern React tooling, Clerk for authentication and UploadThing for handling file uploads. All code is open source and can be self‑hosted.

## Features

- Drag–and–drop file uploads with progress feedback
- Share uploaded files through a public link or by sending an email
- Optional lock so only selected user emails can access a session
- Preview images and PDFs directly in the browser
- Download individual files or everything as a zip archive
- Authentication via Clerk (can be replaced with any provider)
- Prisma models for storing users, file sessions and metadata

## Tech Stack

- **Next.js** with the App Router
- **React** and **TypeScript**
- **UploadThing** for upload handling
- **Clerk** for user authentication
- **Prisma** with a PostgreSQL database
- **Tailwind CSS** and shadcn/ui components for styling

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file and provide your settings:
   - `DATABASE_URL` – connection string for your PostgreSQL database
   - `BASE_URL` – public URL of the app (used for upload callbacks)
   - Clerk environment variables if you use Clerk for auth
3. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Self‑Hosting

Because FilerMan is fully open source you can deploy it anywhere you can run a Node.js application. After providing the required environment variables you can build and start the production server:

```bash
npm run build
npm start
```

Deploy the resulting application to your platform of choice (VPS, Docker container, etc.) and point it at your PostgreSQL instance and storage provider.

## Repository Structure

- `app/` – Next.js routes and pages (upload UI, file download pages, API routes)
- `components/` – React UI components
- `hooks/` – client side helpers such as drag‑and‑drop handling
- `lib/` – database setup and mock file service
- `prisma/` – Prisma schema and migrations
- `server/` – server side UploadThing router

## Contributing

Contributions and bug reports are welcome. Feel free to open an issue or submit a pull request if you have improvements.

## License

This project is released under the terms of the MIT License. See the `LICENSE` file for details.

