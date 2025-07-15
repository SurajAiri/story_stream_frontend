# Story Stream - AI-Powered Video Automation Platform

The first AI platform that automatically converts startup stories into polished Instagram Reels. From script to final video in minutes, not hours.

## Features

- ⚡ Lightning Fast Rendering (10x faster than traditional methods)
- 🎨 15+ Text Animation Types
- 🤖 Complete AI Automation
- 📱 All Resolutions Supported (480p to 4K)
- 🎙️ Natural Voice Generation
- 🖼️ Smart Visual Creation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Environment variables configured

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Copy the environment variables:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API configuration:

   ```env
   VITE_API_BASE_URL=https://your-api-domain.com
   VITE_PROJECT_API_TOKEN=your-project-api-token-here
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

## API Integration

### Waitlist API

The application integrates with a waitlist API to collect early access signups.

#### Endpoint

```
POST {{baseurl}}/api/waitlist/add
```

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "extra": "Optional Company Name"
}
```

Note: The `extra` field is a string that contains the company name if provided by the user.

#### Authentication

The API requires a project token in the Authorization header:

```
Authorization: Bearer your-project-api-token
```

#### Service Implementation

The waitlist API service is located at `src/services/apis/waitlist_api.ts` and includes:

- TypeScript interfaces for request/response
- Error handling
- Automatic token inclusion
- Optional company field as string in extras

### Environment Variables

- `VITE_API_BASE_URL`: The base URL for your API
- `VITE_PROJECT_API_TOKEN`: Your project's API authentication token

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main application screens
├── services/           # API services and utilities
│   └── apis/          # API integration files
├── lib/               # Utility functions
└── assets/            # Static assets
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Icons**: Lucide React

## React + TypeScript + Vite Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
