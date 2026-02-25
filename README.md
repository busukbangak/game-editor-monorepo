# Game Editor Monorepo

An experimental project for exploring ECS architecture and playing around with Three.js. This monorepo contains a game editor and game engine built from scratch as a learning exercise.

## Structure

```
/
├── packages/
│   ├── game-editor/    # Angular Electron game editor application
│   └── game-engine/    # TypeScript game engine library
├── package.json        # Root package.json with workspace configuration  
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Node.js >= 14.0.0
- npm >= 7.0.0

### Installation

Install all dependencies for both packages from the root:

```bash
npm install
```

### Development

Start the game editor:
```bash
npm run start:editor
```

Start the game engine development server:
```bash
npm run start:engine
```

### Building

Build the engine:
```bash
npm run build:engine
```

Build the editor:
```bash
npm run build:editor
```

Build all packages:
```bash
npm run build:all
```

## Git History

Both packages' git histories have been preserved and merged into this monorepo:
- `packages/game-editor` contains the history from the original game-editor repository
- `packages/game-engine` contains the history from the original game-engine repository

## Workspaces

This monorepo uses npm workspaces to manage dependencies across packages. All packages are linked automatically, so changes in the engine are immediately available to the editor during development.
