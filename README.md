# Behemoth - Movie Management & Review

A modern web application for managing movies and sharing reviews, built with React 19, Vite, and Tailwind CSS 4.

## 🚀 Features

- **User Authentication**: Secure login and registration with role-based access control.
- **Movie Management**:
  - Browse a collection of movies with search and pagination support.
  - View detailed information for each movie.
  - Add new movies easily using their IMDb ID.
  - Delete movies (restricted to administrative roles).
- **Review System**:
  - Rate and review movies to share your thoughts.
  - Manage your reviews by deleting them if needed.
- **Protected Routes**: Secure navigation using permission-based guards.
- **State Management**: Persistent authentication state using Zustand.
- **Responsive Design**: Styled with Tailwind CSS 4 for a seamless experience across devices.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [SWR](https://swr.vercel.app/) & [Axios](https://axios-http.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd behemoth-react-fe
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Development Server:
   Start the application in development mode:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for Production:
   ```bash
   pnpm build
   ```

### Configuration

The application currently points to a backend API at `http://localhost:7080`. You can modify this in `src/api/intance.ts`.

## Docker

1. Build the Docker image:
   ```bash
   docker build -t localhost:5000/behemoth-react-fe .
   ```
2. Run the Docker image:
   ```bash
   docker run -d -p 8080:80 --name behemoth-react-fe localhost:5000/behemoth-react-fe
   ```
3. Tips: run the development server on docker container
   ```bash
   docker run --rm -v $(pwd):/app -w /app -p 5173:5173 node:lts-alpine sh -c "npm install &&npm run dev -- --host 0.0.0.0"
   ```
4. Tips: run the development server with makefile (make sure you have installed makefile)
   ```bash
   make install
   make dev
   make build
   ```

## 📁 Project Structure

```text
src/
├── api/        # Axios instances and API service modules
├── assets/     # Static assets like images and icons
├── components/ # Reusable UI components (Modals, Navbars, etc.)
├── pages/      # Main application views/pages
├── routes/     # Routing configuration and definitions
├── store/      # Global state management (Zustand)
└── App.tsx     # Main application entry point
```

## 📜 Available Scripts

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm preview`: Previews the production build locally.

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
