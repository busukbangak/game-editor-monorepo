// Application
export * from './App';

// Entities
export * from './entities/Entity';
export * from './entities/CameraEntity';
export * from './entities/SceneEntity';
export * from './entities/RendererEntity';

// Components
export * from './components/AnimationComponent';
export * from './components/AudioComponent';
export * from './components/CameraComponent';
export * from './components/LightComponent';
export * from './components/ModelComponent';
export * from './components/ParticleComponent';
export * from './components/RendererComponent';
export * from './components/RigidbodyComponent';
export * from './components/SceneComponent';
export * from './components/ScriptComponent';
export * from './components/SpriteComponent';
export * from './components/TransformComponent';

// Systems
export * from './systems/RenderSystem';
export * from './systems/TransformSystem';
export * from './systems/ScriptSystem';

// Managers
export * from './managers/AssetManager';
export * from './managers/EventManager';

/*TODO:
Assetmanager,
cammeramangers,
scenemanager,
scriptAnatomy,
replace threejs
PhysicsSystem
CameraSystem
AudioSystem
AnimationSystem

SCIRPTSYSTEM
-> typescript 
-> javascript
-> external library (import, exports)
-> script kann entität über this getten
-> script kann events feuern über this
-> script ist klasse
-> script ist funktion

*/

