import { Entity } from './Entity';
import { SceneComponent } from '../components/SceneComponent';
import * as THREE from 'three';
import { World } from '../World';

class SceneEntity extends Entity {

    constructor() {
        super();

        this.addComponent(SceneComponent, { 
            active: true, 
            background: new THREE.Color(0x959595) 
        });
        
    }
}

export { SceneEntity };