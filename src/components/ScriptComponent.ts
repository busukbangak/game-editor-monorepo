
import { Component } from "./Component";
import { Asset } from "../managers/AssetManager"
import { Entity } from "../entities/Entity";
import { World } from "../World";

class ScriptComponent implements Component {

    reload: boolean;

    enabled: boolean;

    asset: Asset;

    value: any;

    constructor(options?: Object) {
        this.reload = false;
        this.enabled = true;
        this.asset = undefined;
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