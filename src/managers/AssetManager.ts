
import * as THREE from "three";
import { Manager } from "./Manager";

interface Asset {
    name: string;
    path: string;
    value: any;
    tags?: string[];
}

class AssetManager implements Manager {

    assets: {[key: string]: Asset};

    queue: {[key: string]: Asset};

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

    async addAsset(name: string, path: string, tags?: string[]) {

    }

    async removeAsset(name?: string, path?: string, tags?: string[]) {

    }


    async loadAsset(name: string, path?: string, tags?: string[]) {

        if(this.assets[name]) {
            return this.assets[name]
        }

        if(!path) {
            console.warn('Asset not found!');
            return null;
        }

        return new Promise(resolve => this.fileLoader.load(path, resolve))
            .then((res) => {
                this.assets[name] = {name: name, path: path, value: res };
                return this.assets[name];
            });
    }

    async reloadAsset(name?: string, path?: string, tags?: string[]) {
        // Get reload asset path
        let assetPath = this.assets[name].path;

        // Delete old asset from registry
        delete this.assets[name]
        
        // Reload asset
        let reloadedAsset = await this.loadAsset(name, assetPath);

        return reloadedAsset;
    }

}

export { AssetManager, Asset };
