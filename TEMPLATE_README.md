# 🚀 Astro + Tailwind CSS Template

> **Modern, Production-Ready Web Application Template** - A comprehensive starter template built with Astro.js and Tailwind CSS featuring a complete component library, authentication patterns, data handling utilities, and beautiful UI components.

## ✨ Features

### 🎨 **Component Library**
- **UI Components**: Button, Card, Badge, Modal, Input, and more
- **Form Components**: Complete form handling with validation
- **Layout Components**: Responsive navigation, sidebars, and containers
- **Loading States**: Skeleton components for better UX
- **Consistent Design**: Global Tailwind CSS utilities and patterns

### 🔐 **Authentication Ready**
- Complete login/register forms
- Token-based authentication
- Password reset functionality
- Protected routes patterns
- Auth state management

### 📡 **Data Handling**
- Robust API client with retry logic
- TypeScript interfaces and types
- Error handling utilities
- File upload support
- Token management

### 🎯 **Developer Experience**
- TypeScript support
- Hot reload development
- Component-based architecture
- Accessibility features
- Mobile-first responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the template
git clone <your-repo-url>
cd astro-tailwind-template

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your application.

## 📁 Project Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/            # Basic UI components
│   │   ├── forms/         # Form components
│   │   ├── layout/        # Layout components
│   │   ├── auth/          # Authentication components
│   │   ├── data/          # Data display components
│   │   └── skeletons/     # Loading skeletons
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   ├── services/          # API and business logic
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global styles and Tailwind config
│   └── assets/            # Images, icons, etc.
├── astro.config.mjs       # Astro configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🧩 Component Library Usage

### Basic UI Components

#### Button Component
```astro
---
import Button from '../components/ui/Button.astro';
---

<!-- Primary button -->
<Button variant="primary" size="lg">
  Click me
</Button>

<!-- Loading state -->
<Button variant="primary" loading>
  Processing...
</Button>

<!-- With icon -->
<Button 
  variant="secondary" 
  icon="<svg>...</svg>"
  iconPosition="left"
>
  Save
</Button>

<!-- Link button -->
<Button 
  variant="link"
  href="/dashboard"
>
  Go to Dashboard
</Button>
```

#### Card Component
```astro
---
import Card from '../components/ui/Card.astro';
---

<!-- Basic card -->
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>

<!-- Interactive card with hover effects -->
<Card variant="hover" padding="lg">
  <h3>Interactive Card</h3>
  <p>This card has hover animations.</p>
</Card>

<!-- Gradient card -->
<Card variant="gradient">
  <h3>Beautiful Card</h3>
  <p>With gradient background.</p>
</Card>
```

#### Badge Component
```astro
---
import Badge from '../components/ui/Badge.astro';
---

<Badge variant="success">Online</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info" size="lg">Information</Badge>
```

### Form Components

#### Input Component
```astro
---
import Input from '../components/forms/Input.astro';
---

<Input
  type="email"
  name="email"
  label="Email Address"
  placeholder="Enter your email"
  required
  error={errors?.email}
/>

<Input
  type="password"
  name="password"
  label="Password"
  required
  autocomplete="current-password"
/>
```

### Authentication Components

#### Login Form
```astro
---
import LoginForm from '../components/auth/LoginForm.astro';
---

<LoginForm 
  title="Welcome Back"
  subtitle="Sign in to your account"
  redirectTo="/dashboard"
  showRememberMe={true}
  showForgotPassword={true}
/>
```

### Loading States

#### Skeleton Components
```astro
---
import CardSkeleton from '../components/skeletons/CardSkeleton.astro';
---

<!-- Loading card with header and 3 content rows -->
<CardSkeleton 
  rows={3}
  showHeader={true}
  showFooter={false}
/>
```

## 🎨 Global Styles Usage

The template includes comprehensive global Tailwind CSS utilities:

### Card Styles
```html
<!-- Basic card -->
<div class="card">Content</div>

<!-- Interactive card -->
<div class="card-hover">Content with hover effects</div>

<!-- Gradient card -->
<div class="card-gradient">Beautiful gradient card</div>
```

### Button Styles
```html
<!-- Primary button -->
<button class="btn-primary">Primary Action</button>

<!-- Secondary button -->
<button class="btn-secondary">Secondary Action</button>

<!-- Danger button -->
<button class="btn-danger">Delete</button>

<!-- Ghost button -->
<button class="btn-ghost">Subtle Action</button>
```

### Form Styles
```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" />
  <p class="form-error">Error message</p>
</div>
```

### Badge Styles
```html
<span class="badge-success">Success</span>
<span class="badge-warning">Warning</span>
<span class="badge-error">Error</span>
<span class="badge-info">Info</span>
```

### Layout Utilities
```html
<!-- Responsive grid -->
<div class="grid-responsive">
  <!-- Items will be 1 col on mobile, 2 on tablet, 3 on desktop, 4 on xl -->
</div>

<!-- Stats grid -->
<div class="grid-stats">
  <!-- Optimized for dashboard statistics -->
</div>

<!-- Container with responsive padding -->
<div class="container-padding">
  <div class="page-header">
    <h1 class="page-title">Page Title</h1>
    <p class="page-subtitle">Page description</p>
  </div>
</div>
```

## 🔐 Authentication Setup

### 1. Configure API Endpoints

Update `src/services/api.ts`:

```typescript
export const API_CONFIG = {
  baseURL: 'https://your-api.com/api',
  timeout: 10000,
  retries: 3,
};
```

### 2. Set Environment Variables

Create `.env` file:

```env
PUBLIC_API_URL=https://your-api.com/api
```

### 3. Implement Authentication Service

```typescript
// src/services/auth.ts
import { api } from './api';
import type { LoginCredentials, AuthResponse } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    clearAuthToken();
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
```

### 4. Create Protected Routes

```astro
---
// src/components/ProtectedRoute.astro
const token = Astro.cookies.get('authToken')?.value;
if (!token) {
  return Astro.redirect('/auth/login');
}
---

<slot />
```

## 📡 Data Handling

### Using the API Client

```typescript
import { api, handleApiError } from '../services/api';

// GET request
try {
  const users = await api.get('/users');
  console.log(users.data);
} catch (error) {
  console.error(handleApiError(error));
}

// POST request with data
try {
  const newUser = await api.post('/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });
} catch (error) {
  console.error(handleApiError(error));
}

// File upload
try {
  const result = await api.upload('/files', file);
} catch (error) {
  console.error(handleApiError(error));
}
```

### Type Safety

Define your data types:

```typescript
// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Use with API calls
const users = await api.get<User[]>('/users');
```

## 🎯 Best Practices

### Component Organization
- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper accessibility attributes
- Use semantic HTML elements

### Styling Guidelines
- Use global utility classes for consistency
- Leverage the component styles from `globals.css`
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

### Performance
- Lazy load components when possible
- Optimize images and assets
- Use proper caching strategies
- Minimize bundle size

### Security
- Validate all user inputs
- Implement proper authentication
- Use HTTPS in production
- Sanitize displayed data

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Build settings are automatically detected from `netlify.toml`
3. Set environment variables in Netlify dashboard
4. Deploy!

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The built files are in the `dist/` directory and can be deployed to any static hosting service.

## 🛠️ Customization

### Adding New Components

1. Create component in appropriate `src/components/` subdirectory
2. Define TypeScript interface for props
3. Use global styles from `globals.css`
4. Add to component library documentation

### Extending Global Styles

Add new utilities to `src/styles/globals.css`:

```css
@layer components {
  .my-custom-component {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg;
  }
}
```

### Custom Themes

Modify `tailwind.config.js` to add custom colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

## 📚 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this template for any project.

---

**Happy coding!** 🎉