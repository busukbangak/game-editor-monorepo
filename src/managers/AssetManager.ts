
import * as THREE from "three";
import { Manager } from "./Manager";

interface Asset {
    name: string;
    path: string;
    value: any;
    tags?: string[];
}

class AssetManager implements Manager {

    static assets: {[key: string]: Asset};

    static queue: {[key: string]: Asset};

    static fileLoader: THREE.FileLoader;

    static loadingManager: THREE.LoadingManager;

    constructor() {
        AssetManager.assets = {};
        AssetManager.queue = {};
        AssetManager.loadingManager = new THREE.LoadingManager();
        AssetManager.fileLoader = new THREE.FileLoader(AssetManager.loadingManager);

        AssetManager.loadingManager.onLoad = function () {/* 
            console.log('Loading Assets complete!'); */

        };


        AssetManager.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
/* 
            console.log('Loading file: ' + basename(url) + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); */

        };

        AssetManager.loadingManager.onError = function (url) {

            console.warn('There was an error loading ' + url);

        };

    }

    static async addAsset(name: string, path: string, tags?: string[]) {

    }

    static async removeAsset(name?: string, path?: string, tags?: string[]) {

    }


    static async loadAsset(name: string, path?: string, tags?: string[]) {

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

    static async reloadAsset(name?: string, path?: string, tags?: string[]) {
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
