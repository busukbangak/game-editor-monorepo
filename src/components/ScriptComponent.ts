
import { Component } from "./Component";

class ScriptComponent implements Component {

    name: string;

    reload: boolean;

    enabled: boolean;

    value: string;

    constructor(options?: Object) {
        this.name = undefined;
        this.reload = true;
        this.enabled = true;
        this.value = undefined;
        
        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }
    }

}

export { ScriptComponent };