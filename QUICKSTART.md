# ⚡ Quick Start Guide

Get up and running with the Astro + Tailwind CSS Template in under 5 minutes!

## 🚀 Installation

```bash
# Clone the template
git clone <your-repo-url>
cd astro-tailwind-template

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your application.
Visit `http://localhost:4321/demo` to explore all components.

## 🎯 Immediate Usage

### 1. Create a New Page

```astro
---
// src/pages/my-page.astro
import Layout from '../layouts/Layout.astro';
import DashboardLayout from '../layouts/DashboardLayout.astro';
import Button from '../components/ui/Button.astro';
import Card from '../components/ui/Card.astro';
---

<Layout>
  <DashboardLayout>
    <div class="container-padding">
      <div class="page-header">
        <h1 class="page-title">My New Page</h1>
        <p class="page-subtitle">Build something amazing</p>
      </div>

      <div class="grid-responsive">
        <Card variant="hover">
          <h3 class="font-semibold mb-2">Quick Start</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            You're ready to build! This template includes everything you need.
          </p>
          <Button variant="primary">Get Started</Button>
        </Card>
      </div>
    </div>
  </DashboardLayout>
</Layout>
```

### 2. Use Components Instantly

```astro
<!-- Buttons -->
<Button variant="primary" size="lg">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>

<!-- Cards -->
<Card variant="gradient" padding="lg">
  <h3>Beautiful Card</h3>
  <p>With gradient background</p>
</Card>

<!-- Forms -->
<Input
  type="email"
  label="Email"
  placeholder="Enter email"
  required
/>

<!-- Badges -->
<Badge variant="success">Online</Badge>
<Badge variant="warning">Pending</Badge>
```

### 3. Apply Global Styles

```html
<!-- Use pre-built CSS classes -->
<div class="card-hover">Interactive card</div>
<button class="btn-primary">Styled button</button>
<div class="grid-responsive">Responsive grid</div>

<!-- Form with global styles -->
<div class="form-group">
  <label class="form-label">Name</label>
  <input class="form-input" type="text" />
</div>
```

## 🎨 Customization Tips

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#your-color',
          500: '#your-color',
          900: '#your-color',
        }
      }
    }
  }
}
```

### Add Global Styles

Add to `src/styles/globals.css`:

```css
@layer components {
  .my-component {
    @apply bg-white dark:bg-gray-800 rounded-lg p-4;
  }
}
```

### Create New Components

1. Create file in `src/components/ui/MyComponent.astro`
2. Define TypeScript props interface
3. Use global styles for consistency

## 🔐 Quick Auth Setup

### 1. Configure API

Update `src/services/api.ts`:

```typescript
export const API_CONFIG = {
  baseURL: 'https://your-api.com/api',
};
```

### 2. Use Auth Components

```astro
---
import LoginForm from '../components/auth/LoginForm.astro';
---

<LoginForm 
  title="Welcome"
  redirectTo="/dashboard"
/>
```

### 3. Make API Calls

```typescript
import { api } from '../services/api';

// GET request
const users = await api.get('/users');

// POST request
const newUser = await api.post('/users', {
  name: 'John',
  email: 'john@example.com'
});
```

## 📱 Responsive Design

Everything is mobile-first and responsive out of the box:

- Navigation automatically becomes mobile-friendly
- Grid layouts adapt to screen size  
- Forms work perfectly on all devices
- Components scale appropriately

## 🚀 Deploy Quickly

### Netlify (Easiest)

1. Push to GitHub
2. Connect to Netlify
3. Deploy automatically!

### Vercel

```bash
npm install -g vercel
vercel
```

### Static Hosting

```bash
npm run build
# Upload the 'dist' folder to any static host
```

## 📚 Next Steps

1. **Read the [Complete Documentation](./TEMPLATE_README.md)** for detailed usage
2. **Explore `/demo` page** to see all components
3. **Check `src/components/`** for available components
4. **Customize `src/styles/globals.css`** for your brand
5. **Build your app!** 🎉

## 🆘 Need Help?

- 📖 [Full Documentation](./TEMPLATE_README.md)
- 🎮 [Demo Page](http://localhost:4321/demo) 
- 🧩 [Component Examples](./src/components/)
- 🎨 [Global Styles](./src/styles/globals.css)

---

**Happy building!** 🚀