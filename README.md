# Tailwind CSS Dashboard Demo

A DUMMY DevOps monitoring dashboard built with Astro.js and Tailwind CSS to demonstrate the power of utility-first CSS for backend developers.

## Features

- 📊 Interactive dashboard with charts and metrics
- 🔔 Notification system components
- ⚡ Resource usage timeline
- 🎛️ Toggle switches and interactive elements
- 📱 Fully responsive design
- 🎨 Built entirely with Tailwind CSS utilities

## Technologies Used

- **Astro.js** - Modern static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Visit `http://localhost:4321` to see the dashboard.

### Build for Production

```bash
# Build the project
pnpm run build

# Preview the build
pnpm run preview
```

## Deploy to Netlify

### Option 1: Drag and Drop

1. Run `pnpm run build`
2. Drag the `dist` folder to [Netlify's deploy interface](https://app.netlify.com/drop)

### Option 2: Git Integration

1. Push this project to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
pnpm install -g netlify-cli

# Build and deploy
pnpm run build
netlify deploy --prod --dir=dist
```

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components
│   ├── layouts/      # Page layouts
│   ├── pages/        # Page components
│   └── styles/       # Global styles
├── netlify.toml      # Netlify configuration
├── astro.config.mjs  # Astro configuration
└── tailwind.config.js # Tailwind configuration
```

## Demo Components

This project includes several components that showcase Tailwind CSS features:

- **StatsCard** - Metric display cards with hover effects
- **LineChart** - Data visualization with pure CSS
- **DeploymentTable** - Responsive data tables
- **AlertCard** - Status notifications with different states
- **NotificationBell** - Comparison between CSS and Tailwind approaches
- **ToggleSwitch** - Interactive form controls
- **ResourceTimeline** - Timeline visualization with tooltips

## Learning Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro Documentation](https://docs.astro.build/)
- [TAILWIND-DEMO.md](./TAILWIND-DEMO.md) - Comprehensive guide to Tailwind CSS

## License

MIT License - feel free to use this project for learning and demonstration purposes.
