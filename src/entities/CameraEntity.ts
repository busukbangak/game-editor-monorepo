import { Entity } from './Entity';
import { Transform } from '../components/Transform';
import { Camera, CameraType } from '../components/Camera';

class CameraEntity extends Entity {

    constructor() {
        super();

        this.addComponent(Transform);

        this.addComponent(Camera, { 
            active: true,
            type: CameraType.Perspective 
        })

        this.getComponent(Transform).value.translateX(0);
        this.getComponent(Transform).value.translateY(0);
        this.getComponent(Transform).value.translateZ(5);

        this.getComponent(Camera).value.lookAt(0,0,0)
        
    }
}

export { CameraEntity };