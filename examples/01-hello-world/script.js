start();

async function start() {
    // create new application
    let world = new DOT.World();

    // load assets immediately
    let rotationScriptJS = await DOT.AssetManager.loadAsset('script-rotation-js', './assets/RotationScript.js');
    let rotationScriptTS = await DOT.AssetManager.loadAsset('script-rotation-ts', './assets/RotationScript.ts');

    // create renderer
    let rendererEntity = new DOT.RendererEntity();
    world.addEntity(rendererEntity);

    // create scene
    let sceneEntity = new DOT.SceneEntity();
    world.addEntity(sceneEntity);

    // create camera
    let cameraEntity = new DOT.CameraEntity();
    world.addEntity(cameraEntity);

    // create box model
    let boxEntity = world.addEntity();
    boxEntity.addComponent(DOT.TransformComponent);
    boxEntity.addComponent(DOT.ModelComponent, { type: DOT.ModelType.Box, wireframe: false });
    boxEntity.addComponent(DOT.ScriptComponent, { asset: rotationScriptJS });

    // create cone model
    let coneEntity = world.addEntity();
    coneEntity.addComponent(DOT.TransformComponent);
    coneEntity.addComponent(DOT.ModelComponent, { type: DOT.ModelType.Cone, wireframe: false });
    coneEntity.addComponent(DOT.ScriptComponent, { asset: rotationScriptTS });

    // create light
    let lightEntity = world.addEntity();
    lightEntity.addComponent(DOT.TransformComponent);
    lightEntity.addComponent(DOT.LightComponent);

    // Start world
    world.start();

    // Show performance
    DOT.StatisticManager.showStats();

    // Log world
    console.log(world)
}