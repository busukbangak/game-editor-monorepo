
import * as THREE from "three";
import { Manager } from "./Manager";
import { basename } from "path";

class AssetManager implements Manager {

    assets: {[key: string]: {value: any, path: string, tags?: string[]}};

    queue: {[key: string]: {value: any, path: string, tags?: string[]}};

    loadingManager: THREE.LoadingManager;

    fileLoader: THREE.FileLoader;

    constructor() {
        this.assets = {};
        this.queue = {};
        this.loadingManager = new THREE.LoadingManager();
        this.fileLoader = new THREE.FileLoader(this.loadingManager);

        this.loadingManager.onLoad = function () {/* 
            console.log('Loading Assets complete!'); */

        };


        this.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
/* 
            console.log('Loading file: ' + basename(url) + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); */

        };

        this.loadingManager.onError = function (url) {

            console.warn('There was an error loading ' + url);

        };

    }


    async loadAsset(name: string, path?: string, tags?: string[]) {

        if(this.assets[name]) {
            return this.assets[name]
        }

        if(!path) {
            console.warn(`Asset ${name} not found!`);
            return;
        }

        return new Promise(resolve => this.fileLoader.load(path, resolve))
            .then((res) => {
                this.assets[name] = {value: res, path: path};
                return res;
            });
    }


}

export { AssetManager };
