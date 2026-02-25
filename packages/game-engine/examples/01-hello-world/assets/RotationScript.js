/**
 * This class is javascript
 */
class RotationScript extends DOT.Script {

    x;
    y;

    start() {
        this.x = 0.01;
        this.y = 0.01;

        DOT.EventManager.on('logHelloWorld', (event) => this.onLogHelloWorld(event));
        
        let modelComponent = this.entity.getComponent(DOT.ModelComponent);
        modelComponent.value.material.wireframe = true;
        
    }

    update() {
        let transform = this.entity.getComponent(DOT.TransformComponent).value;
        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
        transform.position.setX(1.5);
    }

    onLogHelloWorld(event) {
        console.log(event.data);
    }

}