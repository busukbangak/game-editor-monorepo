import { Entity } from './Entity';
import { TransformComponent } from '../components/TransformComponent';
import { CameraComponent, CameraType } from '../components/CameraComponent';

class CameraEntity extends Entity {

    constructor() {
        super();

        this.addComponent(TransformComponent);

        this.addComponent(CameraComponent, { 
            active: true,
            type: CameraType.Perspective 
        })

        this.getComponent(TransformComponent).value.translateX(0);
        this.getComponent(TransformComponent).value.translateY(0);
        this.getComponent(TransformComponent).value.translateZ(5);
        
    }
}

export { CameraEntity };