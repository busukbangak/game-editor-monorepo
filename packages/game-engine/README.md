# Game Engine (DOT)

An experimental ECS (Entity Component System) based game engine built with TypeScript and Three.js. This is a learning project exploring game engine architecture.

## Features

- **ECS Architecture** - Built on the ECSY library
- **3D Rendering** - Powered by Three.js
- **Component-based** - Modular system with various components (Transform, Model, Light, Camera, Script, etc.)
- **Asset Management** - Load and manage game assets
- **Scripting Support** - Write game logic in TypeScript or JavaScript
- **Physics** - Integrated with Ammo.js for physics simulation

## Important: Monorepo Setup

This package is part of a monorepo workspace. Run all commands from the **root directory** using workspace scripts.

## Getting Started

### Running the Development Server

From the **root directory**:

```bash
npm run start:engine
```

This will:
- Start a webpack dev server on `http://localhost:4200`
- Compile TypeScript source to `build/dot.js`
- Serve the entire game-engine directory with hot reload
- Auto-rebuild on source code changes

### Viewing the Example

1. Start the dev server: `npm run start:engine`
2. Open your browser to: `http://localhost:4200/examples/01-hello-world/`

**Port Conflict:** The engine dev server uses port 4200 (same as the game editor). You can only run one at a time.

## Example Overview

The "Hello World" example (`examples/01-hello-world/`) demonstrates:

- Creating a `DOT.World` instance
- Setting up renderer, scene, and camera entities
- Creating 3D models (box and cone)
- Adding rotation scripts to models
- Adding lighting to the scene
- Starting the game loop
- Displaying performance statistics

### Example Code Structure

```
examples/01-hello-world/
├── index.html          # HTML entry point
├── script.js           # Main example code
└── assets/
    ├── RotationScript.js   # JavaScript rotation script
    └── RotationScript.ts   # TypeScript rotation script
```

## Building

Build the engine library:

```bash
# From root directory
npm run build:engine

# This creates:
# - build/dot.js (development build)
# - build/dot.min.js (production build)
# - docs/ (TypeDoc documentation)
```

## Using the Engine

The engine is compiled to a UMD module accessible as `DOT` globally:

```html
<script src="path/to/build/dot.js"></script>
<script>
  const world = new DOT.World();
  // ... your game code
</script>
```

## Core Concepts

### World
The main container for all entities and systems.

### Entities
Game objects that hold components.

### Components
Data containers (Transform, Model, Light, Camera, Script, etc.).

### Systems
Logic processors that operate on entities with specific components.

## Available Components

- `TransformComponent` - Position, rotation, scale
- `ModelComponent` - 3D model rendering
- `CameraComponent` - Camera setup
- `LightComponent` - Scene lighting
- `ScriptComponent` - Custom game logic
- `RendererComponent` - WebGL renderer
- `SceneComponent` - Scene management
- `RigidbodyComponent` - Physics bodies
- `AudioComponent` - Sound playback
- `AnimationComponent` - Animations
- `ParticleComponent` - Particle systems
- `SpriteComponent` - 2D sprites

## Development TODO

- Asset manager improvements
- Camera manager
- Scene manager
- Script anatomy documentation
- Replace/abstract Three.js dependency
- Enhanced physics system
- Advanced camera system
- Audio system improvements
- Animation system enhancements
- **Script System:**
  - TypeScript support
  - JavaScript support ✓
  - External library imports/exports
  - Entity access via `this` ✓
  - Event system via `this`
  - Class-based scripts ✓


