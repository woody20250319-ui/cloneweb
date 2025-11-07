# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.0 application built with React 19.2, TypeScript, and Tailwind CSS v4. The project uses the shadcn/ui component library (New York style) with Radix UI primitives. Based on git history, this repository contains multiple H5/web applications including:
- AI Story Writer (Squibler clone) - current main page
- 五子棋H5游戏 (Gomoku game)
- 中文取名神器 (Chinese Name Generator)
- 政策信息查询系统 (Policy Information Query System)

## Development Commands

### Package Manager
- **pnpm** is used as the package manager (pnpm-lock.yaml present)

### Common Commands
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

### Directory Structure
```
app/              # Next.js App Router pages
  page.tsx        # Main page (currently AI Story Writer)
  layout.tsx      # Root layout with Analytics
  globals.css     # Global styles with Tailwind
components/
  ui/             # shadcn/ui components (60+ components)
  theme-provider.tsx
hooks/
  use-mobile.ts   # Mobile detection hook
  use-toast.ts    # Toast notification hook
lib/
  utils.ts        # cn() utility for class merging
public/           # Static assets
styles/           # Additional styles
```

### Key Technologies
- **Framework**: Next.js 16.0 with App Router (RSC enabled)
- **UI Library**: shadcn/ui (New York style) with extensive Radix UI components
- **Styling**: Tailwind CSS v4 with CSS variables, using @tailwindcss/postcss
- **Forms**: react-hook-form + @hookform/resolvers + zod for validation
- **Icons**: lucide-react
- **Analytics**: @vercel/analytics integrated in root layout
- **Theme**: next-themes for dark/light mode support

### Component System
The project uses shadcn/ui with components configured via `components.json`:
- Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui`
- 60+ pre-built UI components in `components/ui/`
- Custom utility function `cn()` in `lib/utils.ts` for conditional class merging

### Configuration Notes
- **TypeScript**: Strict mode enabled with path alias `@/*`
- **Next.js Config**:
  - `ignoreBuildErrors: true` - TypeScript errors don't block builds
  - `images.unoptimized: true` - Image optimization disabled
- **Tailwind**: Using v4 with @tailwindcss/postcss plugin (no separate tailwind.config file)

## Development Guidelines

### Adding New Components
- Use shadcn/ui CLI for new components: `npx shadcn-ui@latest add [component]`
- Components are added to `components/ui/` automatically
- Always use the `cn()` utility from `@/lib/utils` for conditional classes

### Styling Conventions
- Use Tailwind utility classes for styling
- CSS variables are configured in `app/globals.css` for theming
- Component variants use `class-variance-authority` (cva)

### Path Aliases
All imports should use the configured aliases:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
```

### Multiple Applications
This codebase hosts multiple H5 applications. When working on a specific feature, verify which application context you're in by checking the current page content and git history.
