import * as DOT from '../../../lib/index';

/**
 * This class is typescript
 */
class RotationScript extends DOT.Entity {

    x: number = 0.01;
    y: number = 0.01;

    start() {
        DOT.EventManager.fire('test', 'Hello world!');
    }

    update() {
        let transform = this.getComponent(DOT.TransformComponent).value;
        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
        transform.position.setY(-1);

        
    }
}