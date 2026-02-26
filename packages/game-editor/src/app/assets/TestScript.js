import * as DOT from '@awanali/dot-engine';

class RotationScript extends DOT.Script {

    x;
    y;

    start() {
        this.x = 0.01;
        this.y = 0.01;
        console.log('Hello world!');
    }

    update() {
        let transform = this.entity.getComponent(DOT.Transform).value;
        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
    }
}