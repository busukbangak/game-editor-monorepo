import { System } from "./System";

import * as THREE from "three";

import { Entity } from "../entities/Entity";

export class RenderSystem extends System {

    renderer: THREE.WebGLRenderer;

    scenes: {[key: string]: THREE.Scene};

    constructor(canvas: HTMLCanvasElement) {
        super(); 

        this.scenes = {};

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        /* window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            let camera: any = this.cameras[this.currentCamera];
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            this.renderer.setSize(width, height);
        });h
 */
    }

    initialize(entities: Entity[]) {
      /*   for(let entity of entities) {
            if(entity.hasComponent(Scene)) {
                if(!this.scenes[entity.getComponent(Scene).id]) {
                    this.scenes[entity.getComponent(Scene).id] = new THREE.Scene();
                }
            }
        } */
      /*   this.setResponsiveCanvasRenderer();
        console.log(entities) */
    }

    update(tick: number, entities: Entity[]) {
        for (let entity of entities) {
            /*  console.log(entity.getComponent(Model)) */
        }

    }

/*     setResponsiveCanvasRenderer(camera: any) {
        window.removeEventListener('resize', this.resizeCanvas(camera));
        window.addEventListener('resize', this.resizeCanvas(camera));
    }

    resizeCanvas(camera: any) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    } */



}