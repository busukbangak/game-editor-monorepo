import { System } from "./System";
import { Entity } from "../entities/Entity";
import { Renderer } from "../components/Renderer";
import { Scene } from "../components/Scene";
import { Camera } from "../components/Camera";
import { World } from "../World";

class RenderSystem extends System {


    activeRenderer: Renderer;

    activeScene: Scene;

    activeCamera: Camera;


    constructor(world: World) {
        super(world);
        this.queries = [Renderer, Scene, Camera];
    }

    initialize(entities: Entity[]) {
        this.updateActiveObjects(entities);
        this.resizeCanvas();
        if (!this.activeRenderer.canvas) {
            document.body.appendChild(this.activeRenderer.value.domElement);
        }

        if (this.activeRenderer.resize) {
            window.addEventListener('resize', () => {
                this.resizeCanvas() 
            });
        }
    }

    update(tick: number, entities: Entity[]) {
        // TODO: Check if update is even needed
        this.updateActiveObjects(entities);
        this.activeRenderer.value.render(this.activeScene.value, this.activeCamera.value);

    }

    updateActiveObjects(entities: Entity[]) {
        for (let entity of entities) {
            // set active renderer
            if (entity.hasComponent(Renderer)) {
                if (entity.getComponent(Renderer).active) {
                    this.activeRenderer = entity.getComponent(Renderer);
                }
            }
            // set active scene
            if (entity.hasComponent(Scene)) {
                if (entity.getComponent(Scene).active) {
                    this.activeScene = entity.getComponent(Scene);
                }
            }
            // set active camera
            if (entity.hasComponent(Camera)) {
                if (entity.getComponent(Camera).active) {
                    this.activeCamera = entity.getComponent(Camera);
                }
            }
        }
    }

    resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        let camera: any = this.activeCamera.value;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        this.activeRenderer.value.setSize(width, height);
    }

}

export { RenderSystem };