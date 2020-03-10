import { World } from './.engine/World';
import { Renderer } from './.engine/components/Renderer';
import { Scene } from './.engine/components/Scene';
import { Transform } from './.engine/components/Transform';
import { Camera } from './.engine/components/Camera';
import { Model } from './.engine/components/Model';
import { Light } from './.engine/components/Light';
import { SceneSystem } from './.engine/systems/SceneSystem'
import { TransformSystem } from './.engine/systems/TransformSystem';
import * as THREE from 'three';
import { Script } from './.engine/components/Script';
import { ScriptSystem } from './.engine/systems/ScriptSystem';
import { RenderSystem } from './.engine/systems/RenderSystem';


export class Application {

    world: World;

    constructor() {
        this.world = new World();
    }

    start() {
        this.world.start();
    }

    stop() {
        this.world.stop();
    }

}



/*

World

Entity
Component
System

Components:
Scene (OBJECT3d)
Script braucht das object 3d als refrenz zum manipulieren
Light (OBJECT3d)
Camera (OBJECT3d)
Model (OBJECT3d)
Rigidbody braucht das object 3d als refrenz zum manipulieren
Audio  (OBJECT3d)
Animation braucht das object 3d als refrenz zum manipulieren

Systems:
RenderSystem (Scene, Model)
PhysicsSystem
ScriptSystem
LightSystem
ModelSystem
CameraSystem
AudioSystem
AnimationSystem







*/