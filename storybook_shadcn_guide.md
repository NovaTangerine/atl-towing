# Integrating Shadcn UI with Storybook: Step-by-Step Guide

This guide explains how to establish a premium component design system using **Shadcn UI** and **Storybook** in a modern React + TypeScript + Vite project.

---

## 🛠️ Step 1: Initialize the Project (React + TypeScript + Vite)

Shadcn UI requires a modern framework environment with Tailwind CSS. Vite is lightweight, ultra-fast, and excellent for design systems.

```bash
# In your project directory
npm create vite@latest ./ -- --template react-ts
npm install
```

---

## 🎨 Step 2: Install and Configure Tailwind CSS

Shadcn is built entirely on Tailwind CSS tokens. Install Tailwind CSS and its peer dependencies, then generate configuration files:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Tailwind Paths (`tailwind.config.js`)
Add the paths to all of your template files:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}" // Crucial: Storybook files must be scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the Tailwind directives to your CSS entry point (e.g., `src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📦 Step 3: Initialize Shadcn UI

Before running the Shadcn initialization, ensure TypeScript knows how to resolve path aliases like `@/*` (which Shadcn uses for its imports).

1. Install paths config parser:
   ```bash
   npm install -D @types/node
   ```
2. Update `tsconfig.json` and `vite.config.ts` to support path aliases:

   **`vite.config.ts`**
   ```typescript
   import path from "path"
   import react from "@vitejs/plugin-react"
   import { defineConfig } from "vite"

   export default defineConfig({
     plugins: [react()],
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   })
   ```

   **`tsconfig.json`** (Add to `compilerOptions`)
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

3. Run the Shadcn initializer:
   ```bash
   npx shadcn@latest init
   ```
   *Select custom configuration choices (e.g., TypeScript, Default style, Slate/Neutral palette, and your global CSS path: `src/index.css`).*

---

## 🚀 Step 4: Install Storybook

Initialize Storybook in the root of your project:

```bash
npx storybook@latest init
```

This command will automatically:
- Set up directories (`.storybook`, `src/stories`).
- Add scripts to `package.json` (`storybook`, `build-storybook`).
- Install necessary Vite plugins and loaders.

---

## 🔗 Step 5: Connect Shadcn Tailwind CSS to Storybook

To render Shadcn components styled with Tailwind inside the Storybook canvas, Storybook needs to load your global stylesheet.

Open **`.storybook/preview.ts`** (or `.storybook/preview.js`) and import your CSS entrypoint at the very top:

```typescript
import type { Preview } from "@storybook/react";
import '../src/index.css'; // Add this line to import your tailwind styles

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

---

## ⚙️ Step 6: Configure Path Aliases for Storybook

Since Storybook compiles independently using Vite, we must ensure it respects the `@/*` aliases used by Shadcn.

Open **`.storybook/main.ts`** (or `main.js`) and verify/configure the alias resolution under the `viteFinal` hook:

```typescript
import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }
    return config;
  },
};
export default config;
```

---

## 🧪 Step 7: Create and Document Your First Shadcn Component

1. Add a Shadcn component (e.g., `Button`):
   ```bash
   npx shadcn@latest add button
   ```
   This will place a beautifully styled component in `src/components/ui/button.tsx`.

2. Write a Storybook story for it (**`src/components/ui/button.stories.tsx`**):
   ```typescript
   import type { Meta, StoryObj } from "@storybook/react";
   import { Button } from "./button";

   const meta: Meta<typeof Button> = {
     title: "Components/UI/Button",
     component: Button,
     tags: ["autodocs"],
     argTypes: {
       variant: {
         control: "select",
         options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
       },
       size: {
         control: "select",
         options: ["default", "sm", "lg", "icon"],
       },
     },
   };

   export default meta;
   type Story = StoryObj<typeof Button>;

   export const Default: Story = {
     args: {
       children: "Button",
       variant: "default",
     },
   };

   export const Secondary: Story = {
     args: {
       children: "Secondary Button",
       variant: "secondary",
     },
   };

   export const Outline: Story = {
     args: {
       children: "Outline Button",
       variant: "outline",
     },
   };
   ```

---

## 🏃‍♂️ Step 8: Run Storybook!

Launch Storybook and view your dynamic Shadcn component library locally:

```bash
npm run storybook
```
Your components will render perfectly styled by Tailwind, completely interactive, and fully documented inside the Storybook workbench!
