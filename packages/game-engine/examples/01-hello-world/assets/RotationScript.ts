/**
 * This class is typescript
 */
class RotationScript extends DOT.Script{

    x: number = 0.01;
    y: number = 0.01;

    start() {
        DOT.EventManager.fire('logHelloWorld', 'Hello world!');
    }

    update() {
        let transform = this.entity.getComponent(DOT.TransformComponent).value;

        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
        transform.position.setX(-1.5);
    }
}