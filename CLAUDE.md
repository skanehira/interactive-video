# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive video application built with React, TypeScript, and Vite. The project is set up as a modern frontend application with hot module replacement and TypeScript support.

## Commands

### Development
- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Type-check and build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

### Installation
- `npm install` - Install dependencies

## Architecture

### Technology Stack
- **React 19.1.0** - UI framework
- **TypeScript 5.8.3** - Type safety with strict mode enabled
- **Vite 6.3.5** - Build tool with SWC for fast compilation
- **ESLint 9.25.0** - Code quality checks with TypeScript support

### Project Structure
- `/src/main.tsx` - Application entry point
- `/src/App.tsx` - Root component
- `/src/assets/` - Static assets
- `/public/` - Public assets served directly
- `index.html` - HTML entry point

### TypeScript Configuration
- Separate configs for app (`tsconfig.app.json`) and node (`tsconfig.node.json`)
- Strict mode enabled with additional type checking
- React JSX transform configured

### Build Process
- Vite handles bundling and development server
- TypeScript compilation runs before production builds
- ESLint configured with React and TypeScript recommended rules

## Interactive Video Implementation Notes

When implementing interactive video features:
1. Consider using HTML5 `<video>` element as the base
2. Overlay interactive elements using absolute positioning
3. Track video time with `timeupdate` events
4. Handle user interactions to control video playback and branching