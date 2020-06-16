/**
 * This class is javascript
 */
class RotationScript extends DOT.Script {

    x;

    y;

    start() {
        this.x = 0.01;
        this.y = 0.01;

        // TODO: WATCH FOR EVENTS WITH SAME NAME; DELETING ONE REMOVES IT ON ALL LISTNERS
        let testEvent = (event) => {
            console.log(event.data)
            DOT.EventManager.off('test');
        }

        DOT.EventManager.on('test', testEvent);
    }

    update() {
        let transform = this.entity.getComponent(DOT.TransformComponent).value;
        transform.rotation.x += this.x;
        transform.rotation.y += this.y;
        transform.position.setY(1);
    }
}