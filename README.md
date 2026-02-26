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

**Important:** This is a monorepo using npm workspaces. All dependencies must be installed from the root directory.

1. Clone the repository
2. Navigate to the root directory
3. Install all dependencies:

```bash
npm install
```

**Note:** Dependencies (including Electron) are installed at the root level in `node_modules/`, not in individual package directories. This is intentional and required for the workspace setup to work correctly.

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

## Troubleshooting

### Fresh Clone Setup

After cloning this repository for the first time:

1. **Always run `npm install` from the root directory** - This installs dependencies for all packages
2. **Run scripts from the root** - Use `npm run start:editor` from the root, not from inside `packages/game-editor`
3. **Electron location** - Electron is installed at the root `node_modules/` level, not in individual packages

### Common Issues

**"Cannot find module 'electron'"**
- This happens if you try to run the editor from inside `packages/game-editor` instead of the root
- Solution: Always run commands from the root directory using the workspace scripts

**Electron window shows error on startup**
- The `main.ts` file has been configured with:
  - `contextIsolation: false` - Required for `nodeIntegration: true` in modern Electron
  - Correct electron path for monorepo: `path.join(__dirname, '../../node_modules', 'electron')`
- These settings are essential for the app to start correctly

**Build issues**
- Use `npm` instead of `yarn` to avoid packaging issues
- Some scripts require `NODE_OPTIONS=--openssl-legacy-provider` for compatibility with older Angular/Node versions
