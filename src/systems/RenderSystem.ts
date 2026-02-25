import { System } from "./System";
import { Entity } from "../entities/Entity";
import { RendererComponent } from "../components/RendererComponent";
import { SceneComponent } from "../components/SceneComponent";
import { CameraComponent } from "../components/CameraComponent";
import { World } from "../World";

class RenderSystem extends System {


    activeRenderer: RendererComponent;

    activeScene: SceneComponent;

    activeCamera: CameraComponent;


    constructor(world: World) {
        super(world);
        this.queries = [RendererComponent, SceneComponent, CameraComponent];
    }

    initialize(entities: Entity[]) {
        this.updateActiveObjects(entities);
        
        if (!this.activeRenderer.canvas) {
            document.body.appendChild(this.activeRenderer.value.domElement);
        }
        
        this.resizeCanvas();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    update(tick: number, entities: Entity[]) {
        // TODO: Check if update is even needed
        this.updateActiveObjects(entities);
        this.activeRenderer.value.render(this.activeScene.value, this.activeCamera.value);

    }

    updateActiveObjects(entities: Entity[]) {
        for (let entity of entities) {
            // set active renderer
            if (entity.hasComponent(RendererComponent)) {
                if (entity.getComponent(RendererComponent).active) {
                    this.activeRenderer = entity.getComponent(RendererComponent);
                }
            }
            // set active scene
            if (entity.hasComponent(SceneComponent)) {
                if (entity.getComponent(SceneComponent).active) {
                    this.activeScene = entity.getComponent(SceneComponent);
                }
            }
            // set active camera
            if (entity.hasComponent(CameraComponent)) {
                if (entity.getComponent(CameraComponent).active) {
                    this.activeCamera = entity.getComponent(CameraComponent);
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