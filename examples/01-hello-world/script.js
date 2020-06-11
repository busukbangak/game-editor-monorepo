init();
async function init() {
    // create new application
    let app = new DOT.App();

    // load assets immediately
    let assetManager = app.world.getManager(DOT.AssetManager);
    let rotationScript = await assetManager.loadAsset('script-rotation', './assets/RotationScript.js');
    console.log(rotationScript)

    // create renderer
    let rendererEntity = new DOT.RendererEntity();
    app.world.addEntity(rendererEntity);

    // create scene
    let sceneEntity = new DOT.SceneEntity();
    app.world.addEntity(sceneEntity);

    // create camera
    let cameraEntity = new DOT.CameraEntity();
    app.world.addEntity(cameraEntity);

    // create model
    let modelEntity = app.world.createEntity()
        .addComponent(DOT.TransformComponent)
        .addComponent(DOT.ModelComponent, {
            type: DOT.ModelType.Box,
            material: new THREE.MeshStandardMaterial({ color: 0xf28a3a, wireframe: false })
        })
        .addComponent(DOT.ScriptComponent, { value: rotationScript, reload: true})

    
    // create light
    app.world.createEntity()
        .addComponent(DOT.TransformComponent)
        .addComponent(DOT.LightComponent)
        .addComponent(DOT.ScriptComponent, {
            value: (entity, world) => {
                /* world.managers[1].fire('TestEvent', { x: 0.01, y: 0.01 }) */
            }
        })


    app.start();

    console.log(app)
}
