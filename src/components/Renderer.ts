
import { Component } from "./Component";
import * as THREE from "three";

class Renderer implements Component {

    active: boolean;

    readonly canvas: HTMLCanvasElement;

    readonly antialias: boolean;

    readonly alpha: boolean;

    readonly value: THREE.WebGLRenderer;

    constructor(options?: Object) {
        this.active = false;
        this.canvas = undefined;
        this.antialias = false;
        this.alpha = false;

        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }


        this.value = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: this.antialias, alpha: this.alpha });
    }

}

export { Renderer };