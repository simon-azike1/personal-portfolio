# Simon Azike | Personal Portfolio

A modern, responsive portfolio website for Simon Azike, built with React and Vite. The application includes a public portfolio experience, multilingual content, theme support, contact links, and a protected administration dashboard backed by MongoDB.

## Overview

This repository contains both application layers:

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, and React Router
- **Backend:** Express, Mongoose, JWT authentication, Helmet, CORS, compression, and rate limiting
- **Database:** MongoDB Atlas
- **Deployment:** Frontend on Vercel; backend on a Node.js host such as Render, Railway, or Fly.io

## Features

- Responsive portfolio homepage with animated sections
- Projects, skills, and testimonials loaded from the API
- English and French language switching
- Light and dark theme support
- Protected admin dashboard for managing portfolio content
- JWT-based admin authentication
- MongoDB persistence
- API security middleware with CORS, Helmet, compression, and rate limiting
- Vercel-ready production frontend build

## Project Structure

```text
.
├── public/                 # Public static assets
├── server/                 # Express API and MongoDB models
│   ├── config/             # Database configuration
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route handlers
│   ├── seed.js             # Portfolio data seeder
│   ├── seedAdmin.js        # Admin account seeder
│   └── server.js           # API entry point
├── src/                    # React application
│   ├── components/         # Reusable UI sections
│   ├── context/            # Theme and internationalization state
│   ├── Pages/              # Page-level components
│   └── services/api.js     # Frontend API client
├── vercel.json             # SPA rewrite configuration
└── package.json            # Scripts and dependencies
```

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- MongoDB Atlas account or another MongoDB deployment

## Local Development

1. Clone the repository and enter the project directory:

	```bash
	git clone https://github.com/simon-azike1/personal-portfolio.git
	cd personal-portfolio
	```

2. Install dependencies:

	```bash
	npm install
	```

3. Create `server/.env` from the example file:

	```bash
	cp server/.env.example server/.env
	```

4. Add your MongoDB connection string and secrets to `server/.env`.

5. Start the frontend and backend together:

	```bash
	npm run dev
	```

The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

## Environment Variables

### Backend: `server/.env`

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your-long-random-secret
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=use-a-strong-password
```

`ADMIN_EMAIL` and `ADMIN_PASSWORD` are used by the admin seeder. Never commit `server/.env` or place these values in frontend environment variables.

### Frontend: Vite environment

For a deployed frontend, set:

```env
VITE_API_URL=https://your-backend-host.example.com/api
```

The `/api` suffix is required. Vite exposes `VITE_*` variables to browser code, so do not put database credentials or JWT secrets in them.

## Database Setup

1. Create a MongoDB Atlas cluster and database user.
2. Add the backend host to the Atlas Network Access allow list.
3. Set `MONGODB_URI` in the backend environment.
4. Seed the portfolio content if needed:

	```bash
	npm run seed
	```

5. Create or update the admin account:

	```bash
	npm run seed:admin
	```

For more detailed MongoDB guidance, see [MONGODB_SETUP.md](MONGODB_SETUP.md).

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check API availability |
| `GET` | `/api/projects` | List projects |
| `GET` | `/api/projects/:id` | Get one project |
| `POST` | `/api/auth/login` | Authenticate an admin |
| `GET` | `/api/skills` | List skills |
| `GET` | `/api/testimonials` | List testimonials |
| `POST` | `/api/projects` | Create a project; admin token required |
| `PUT` | `/api/projects/:id` | Update a project; admin token required |
| `DELETE` | `/api/projects/:id` | Delete a project; admin token required |

The skills and testimonials resources expose the same create, update, and delete pattern for authenticated administrators.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start frontend and backend in development mode |
| `npm run client` | Start only the Vite frontend |
| `npm run server` | Start only the API with Nodemon |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production frontend locally |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed portfolio data |
| `npm run seed:admin` | Seed the admin account |
| `npm start` | Start the API in production mode |

## Deployment

The frontend and backend are deployed as separate services.

### Frontend on Vercel

1. Import this repository into Vercel.
2. Use the project root as the root directory.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Add `VITE_API_URL` with the deployed backend URL ending in `/api`.
6. Deploy or redeploy the project.

The included `vercel.json` provides the SPA rewrite required for client-side routes.

### Backend on Render, Railway, or Fly.io

1. Deploy the repository as a Node.js service.
2. Use `npm start` as the start command.
3. Set `MONGODB_URI`, `JWT_SECRET`, and `ALLOWED_ORIGINS` in the service environment.
4. Set `ALLOWED_ORIGINS` to the exact Vercel frontend URL, for example:

	```env
	ALLOWED_ORIGINS=https://your-portfolio.vercel.app
	```

5. Run `npm run seed:admin` once against the production database.
6. Verify the API with `https://your-backend-host.example.com/api/health`.

## Security Notes

- Keep `server/.env` out of Git and out of frontend hosting settings.
- Use a long, unique `JWT_SECRET` in production.
- Use a strong, unique MongoDB password and admin password.
- Restrict MongoDB Atlas network access where practical.
- Set `ALLOWED_ORIGINS` to known frontend domains instead of using `*`.
- Rotate credentials immediately if they are ever exposed.

## License

This project is maintained as a personal portfolio. Contact the author before reusing the design, content, or personal assets.

## Author

**Simon Azike**

- GitHub: [simon-azike1](https://github.com/simon-azike1)
