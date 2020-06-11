
import { Component } from "./Component";
import * as THREE from "three";

class RendererComponent implements Component {

    active: boolean;

    readonly canvas: HTMLCanvasElement;

    readonly antialias: boolean;

    readonly alpha: boolean;

    readonly value: THREE.WebGLRenderer;

    readonly resize: boolean;

    constructor(options?: Object) {
        this.active = false;
        this.canvas = undefined;
        this.antialias = false;
        this.alpha = false;
        this.resize = true;

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

export { RendererComponent};