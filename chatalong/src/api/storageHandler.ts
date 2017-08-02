import { CacheFactory, CacheOptions, Cache, GetPutOptions } from 'cachefactory';
const sessionStoragePolyfill = {
    getItem: (key: string): any => {
        if (window.localStorage) {
            return window.localStorage.getItem(key);
        }
        return null;
    },
    setItem: (key: string, value: string) => {
        if (window.localStorage) {
            return window.localStorage.setItem(key, value);
        }
    },
    removeItem: (key: string) => {
        if (window.localStorage) {
            return window.localStorage.removeItem(key);
        }
    },
    clear: () => {
        if (window.localStorage) {
            return window.localStorage.clear();
        }
    }
};

export class DataCache {
    public cacheInstance: Cache;
    public cacheOption: CacheOptions = {
        maxAge: 15 * 60 * 1000, // default to 15 Mins
        deleteOnExpire: 'none',
        storageMode: 'sessionStorage',
        storageImpl: sessionStoragePolyfill
    };
    constructor(cacheNamespace: string, options?: CacheOptions) {
        if (options) {
            this.cacheOption = Object.assign(this.cacheOption, options);
        }
        const objcache = new CacheFactory();
        this.cacheInstance = objcache.createCache(cacheNamespace, this.cacheOption);
    }
    public setItem = (key: string | number, valueToCache: any) => {
        this.cacheInstance.put(key, valueToCache);
    }
    public getItem = (key: string | number): any => {
        const getOptions: GetPutOptions = {
            onExpire: (keyToExpire: string | number) => {
                this.cacheInstance.remove(keyToExpire);
            }
        };
        return this.cacheInstance.get(key, getOptions);
    }
    public removeItem = (key: string | number) => {
        this.cacheInstance.remove(key);
    }
    public removeAll = () => {
        this.cacheInstance.removeAll();
    }
}

export default new DataCache('chat');