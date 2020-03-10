import { System } from "./System";
import { Entity } from "../entities/Entity";
import { Renderer } from "../components/Renderer";
import { Scene } from "../components/Scene";
import { Camera } from "../components/Camera";
import * as THREE from "three";

export class RenderSystem extends System {

    activeScene: THREE.Scene;

    activeCamera: THREE.Camera;

    activeRenderer: THREE.WebGLRenderer;

    constructor() {
        super();
        // TODO: Get only Renderer entity, active camera entity, and active scene entity
        this.queries = [Renderer, Scene, Camera];
    }

    initialize(entities: Entity[]) {
        this.updateActiveObjects(entities);
        this.resizeCanvas();
    }

    update(tick: number, entities: Entity[]) {
        // TODO: Check if update is even needed
        this.updateActiveObjects(entities);
        this.activeRenderer.render(this.activeScene, this.activeCamera);

    }

    updateActiveObjects(entities: Entity[]) {
        for (let entity of entities) {
            // set active renderer
            if (entity.hasComponent(Renderer)) {
                // update passed renderer values
                let renderEntity = entity.getComponent(Renderer);
                let renderOptions = renderEntity.options;
                if (!renderEntity.value) {
                    renderEntity.value = new THREE.WebGLRenderer(renderOptions)
                }
                if (renderEntity.active) {
                    this.activeRenderer = renderEntity.value;
                }
            }
            // set active camera
            if (entity.hasComponent(Camera)) {
                if (entity.getComponent(Camera).active) {
                    this.activeCamera = entity.getComponent(Camera).value;
                }
            }
            // set active scene
            if (entity.hasComponent(Scene)) {
                if (entity.getComponent(Scene).active) {
                    this.activeScene = entity.getComponent(Scene).value;
                }
            }
        }
        // TODO: Remove eventlistner again
        window.addEventListener('resize', () => {
            this.resizeCanvas()
        });
    }

    resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        let camera: any = this.activeCamera;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        this.activeRenderer.setSize(width, height);
    }

}