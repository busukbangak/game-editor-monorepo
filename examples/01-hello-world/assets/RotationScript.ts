import * as DOT from '../../../lib/index';
import { TransformComponent } from '../../../lib/index';

/**
 * This class is typescript
 */
class RotationScript extends DOT.Script {

    x: number = 0.01;
    y: number = 0.01;

    start() {
        DOT.EventManager.fire('test', 'Hello world!');
        DOT.EventManager.fire('test', 'Hello world!');
    }

    update() {
        let transform = this.entity.getComponent(DOT.TransformComponent).value;

        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
        transform.position.setY(-1);

        
    }
}