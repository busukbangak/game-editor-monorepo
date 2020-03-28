
import { Component } from "./Component";

export class Script implements Component {

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