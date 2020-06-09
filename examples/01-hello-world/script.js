
const canvas = document.getElementById("app-canvas");

class RotationScript {

    constructor() {
      
    }

    update(entity, world){
        entity.getComponent(DOT.Transform).value.rotation.x += 0.01;
        entity.getComponent(DOT.Transform).value.rotation.y += 0.01;
    }
}


// create new application
let app = new DOT.App();

// load assets immediately
/* await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript2.js');
await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript.js', 'rotate'); */

// create renderer
let renderer = app.world.createEntity()
    .addComponent(DOT.Renderer, { active: true, canvas: canvas, antialias: true, alpha: true })
    .getComponent(DOT.Renderer).value

// create scene and get the component
let sceneComponent = app.world.createEntity()
    .addComponent(DOT.Scene, { active: true, background: new THREE.Color(0x959595) })
    .getComponent(DOT.Scene)


// create camera
let cameraEntity = app.world.createEntity()
    .addComponent(DOT.Transform, { parent: sceneComponent })
    .addComponent(DOT.Camera, { active: true, type: DOT.CameraType.Perspective })

// set camera position
cameraEntity.getComponent(DOT.Transform)
    .value.position.set(0, 0, 5);


// create model
let modelEntity = app.world.createEntity()
    .addComponent(DOT.Transform, { parent: sceneComponent })
    .addComponent(DOT.Model, { type: DOT.ModelType.Box, material: new THREE.MeshStandardMaterial({ color: 0xf28a3a, wireframe: true }) })
    .addComponent(DOT.Script, {value: new RotationScript()})
    /* .addComponent(DOT.Script, {value: (entity, world) => {
        entity.getComponent(DOT.Transform).value.rotation.x += 0.01;
        entity.getComponent(DOT.Transform).value.rotation.y += 0.01;
    }}) */


// create light
app.world.createEntity()
    .addComponent(DOT.Transform, { parent: sceneComponent })
    .addComponent(DOT.Light)

app.start();

console.log(app)




