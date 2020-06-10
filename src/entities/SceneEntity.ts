import { Entity } from './Entity';
import { Scene } from '../components/Scene';
import * as THREE from 'three';

class SceneEntity extends Entity {

    constructor() {
        super();

        this.addComponent(Scene, { 
            active: true, 
            background: new THREE.Color(0x959595) 
        });
        
    }
}

export { SceneEntity };