# Game Editor

An Electron-based visual editor for creating 3D games built with Angular and Three.js.

Currently runs with:

- Angular v9.0.0
- Electron v9.4.4
- Electron Builder v22.3.2

## Important: Monorepo Setup

This package is part of a monorepo workspace. **Do not run commands directly from this directory.**

### Running the Editor

From the **root directory** of the monorepo:

```bash
# Development mode with hot reload
npm run start:editor

# Build for production
npm run build:editor
```

### First Time Setup

1. Clone the repository
2. From the **root directory**, run: `npm install`
3. Start the editor: `npm run start:editor`

**Critical Notes:**
- Dependencies (including Electron) are installed at the root level
- The editor requires the root `node_modules/` to function correctly
- Always run npm scripts from the root directory using workspace commands

## Development

- **Hot Reload**: The Angular app supports hot reload in development mode
- **Electron Main Process**: Requires manual restart (rebuild with `npm run electron:serve-tsc`)
- **Dev Tools**: Enabled by default in development mode

## Configuration

The main Electron process is configured in `main.ts` with:
- `contextIsolation: false` - Required for Node.js integration
- `nodeIntegration: true` - Allows Node.js APIs in renderer process
- `webSecurity: false` - Disabled for development convenience

## Building Executables

From the root directory:

```bash
# Build for current platform
npm run build:editor

# Platform-specific builds (from packages/game-editor):
npm run electron:windows  # Windows executable
npm run electron:linux    # Linux executable  
npm run electron:mac      # macOS executable
```

## Troubleshooting

**Error: "Cannot find module 'electron'"**
- Ensure you're running commands from the root directory
- Run `npm install` from the root directory first

**Electron window shows error**
- Verify `main.ts` has been compiled: `npm run electron:serve-tsc`
- Check that Angular dev server is running on port 4200

## Additional Commands

From `packages/game-editor` directory (if needed):

```bash
npm run ng:serve:web    # Run in browser mode (no Electron)
npm run electron:local  # Build and run locally
npm run electron:serve-tsc  # Compile main.ts to main.js
```
