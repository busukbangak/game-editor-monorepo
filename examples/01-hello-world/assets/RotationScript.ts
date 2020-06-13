import * as DOT from '../../../lib/index'

/**
 * This class is typescript
 */
class RotationScript extends DOT.Entity {

    x: number;
    y: number;

    constructor() {
        super();
        this.x = 0.01;
        this.y = 0.01;
    }

    update() {
        let transform = this.getComponent(DOT.TransformComponent).value;
        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
        transform.position.setX(1);
    }
}