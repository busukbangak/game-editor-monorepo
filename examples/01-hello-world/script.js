async function start() {
    // create new application
    let app = new DOT.App();

    // load assets immediately
    let assetManager = app.world.getManager(DOT.AssetManager);
    let rotationScriptJS = await assetManager.loadAsset('script-rotation-js', './assets/RotationScript.js');
    let rotationScriptTS = await assetManager.loadAsset('script-rotation-ts', './assets/RotationScript.ts');

    // create renderer
    let rendererEntity = new DOT.RendererEntity();
    app.world.addEntity(rendererEntity);

    // create scene
    let sceneEntity = new DOT.SceneEntity();
    app.world.addEntity(sceneEntity);

    // create camera
    let cameraEntity = new DOT.CameraEntity();
    app.world.addEntity(cameraEntity);

    // create box model
    let boxEntity = app.world.createEntity();
    boxEntity.addComponent(DOT.TransformComponent);
    boxEntity.addComponent(DOT.ModelComponent, { type: DOT.ModelType.Box, wireframe: false });
    boxEntity.addComponent(DOT.ScriptComponent, { asset: rotationScriptJS });

    // create cone model
    let coneEntity = app.world.createEntity();
    coneEntity.addComponent(DOT.TransformComponent);
    coneEntity.addComponent(DOT.ModelComponent, { type: DOT.ModelType.Cone, wireframe: false });
    coneEntity.addComponent(DOT.ScriptComponent, { asset: rotationScriptTS });

    // create light
    let lightEntity = app.world.createEntity();
    lightEntity.addComponent(DOT.TransformComponent);
    lightEntity.addComponent(DOT.LightComponent);

    app.start();

    console.log(app)
}
start();
