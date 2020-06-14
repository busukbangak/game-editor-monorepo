/**
 * This class is javascript
 */
class RotationScript extends DOT.Entity {

    constructor() {
        super();
        this.x = 0.1;
        this.y = 0.1;
    }

    update() {
        let transform = this.getComponent(DOT.TransformComponent).value;
        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
        transform.position.setY(1);
    }
}