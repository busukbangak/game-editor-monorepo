
const canvas = document.getElementById("app-canvas");

class RotationScript {

    x = 0;

    y = 0;

    constructor(world) {
        world.managers[1].on('TestEvent', (event) => {
            console.log(event.data);
            this.x = event.data.x;
            this.y = event.data.y;
            world.managers[1].off('TestEvent')
        })
    }

    update(entity, world) {
        entity.getComponent(DOT.Transform).value.rotation.x += this.x;
        entity.getComponent(DOT.Transform).value.rotation.y += this.y;
    }
}

// create new application
let app = new DOT.App();

// load assets immediately
/* await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript2.js');
await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript.js', 'rotate'); */

// create renderer
let rendererEntity = new DOT.RendererEntity(canvas);
app.world.addEntity(rendererEntity);

// create scene
let sceneEntity = new DOT.SceneEntity();
app.world.addEntity(sceneEntity);

// create camera
let cameraEntity = new DOT.CameraEntity();
app.world.addEntity(cameraEntity);

// create model
let modelEntity = app.world.createEntity()
    .addComponent(DOT.Transform)
    .addComponent(DOT.Model, {
        type: DOT.ModelType.Box,
        material: new THREE.MeshStandardMaterial({ color: 0xf28a3a, wireframe: true })
    })
    .addComponent(DOT.Script, { value: new RotationScript(app.world) })


// create light
app.world.createEntity()
    .addComponent(DOT.Transform)
    .addComponent(DOT.Light)
    .addComponent(DOT.Script, {
        value: (entity, world) => {
            world.managers[1].fire('TestEvent', {x: 0.01, y: 0.01})
        }
    })


app.start();

console.log(app)




