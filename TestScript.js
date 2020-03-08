/* import { Transform } from "./src/app/core/engine/ecs/components/Transform";

export class TestScript {

    shootingCannon: number;

    constructor() {
        console.log('yeet')
    }

    update(entity, tick) {
        entity.getComponent(Transform).value.rotation.x += 0.5;
        entity.getComponent(Transform).value.rotation.y += 0.5;
    }
}

 */

/*  function update() {
     console.log('test');
 }
  */
 /* entity.getComponent(Transform).value.rotation.x += 0.5;
 entity.getComponent(Transform).value.rotation.y += 0.5; */
/*  entity.components[1].value.rotation.y += 0.005;
 entity.components[1].value.rotation.z += 0.05;
 entity.components[1].value.position.z = 7; */
/*   console.log('hello') */

class SoundPlayer {

    sound;

    constructor(sound) {
        this.sound = sound;
    }

    playSound() {
        console.log(this.sound)
    }


}
function yes(element) {
    element.components[1].value.children[0].material.wireframe = true
    element.components[1].value.rotation.y += 0.02
    element.components[1].value.rotation.x += 0.02
    
}
