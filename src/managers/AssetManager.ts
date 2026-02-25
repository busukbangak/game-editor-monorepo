
import * as THREE from "three";
import { Manager } from "./Manager";

interface Asset {
    name: string;
    path: string;
    value: any;
    tags?: string[];
}

class AssetManager implements Manager {

    private static initialized = false;

    public static assets: {[key: string]: Asset} = {};

    public static queue: {[key: string]: Asset} = {};

    private static fileLoader: THREE.FileLoader;

    private static loadingManager: THREE.LoadingManager;

    constructor() {
        if (AssetManager.initialized) {
            return;
        }
        
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
        
        AssetManager.initialized = true;

    }

    static async addAsset(name: string, path: string, tags?: string[]) {

    }

    static async removeAsset(name?: string, path?: string, tags?: string[]) {

    }


    static async loadAsset(name: string, path?: string, tags?: string[]) {

        if(AssetManager.assets[name]) {
            return AssetManager.assets[name]
        }

        if(!path) {
            console.warn('Asset not found!');
            return null;
        }

        return new Promise(resolve => AssetManager.fileLoader.load(path, resolve))
            .then((res) => {
                AssetManager.assets[name] = {name: name, path: path, value: res };
                return AssetManager.assets[name];
            });
    }

    static async reloadAsset(name?: string, path?: string, tags?: string[]) {
        // Get reload asset path
        let assetPath = AssetManager.assets[name].path;

        // Delete old asset from registry
        delete AssetManager.assets[name]
        
        // Reload asset
        let reloadedAsset = await AssetManager.loadAsset(name, assetPath);

        return reloadedAsset;
    }

}

export { AssetManager, Asset };
