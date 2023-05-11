import fs from 'node:fs';
import NodeCache from 'node-cache';
import path from 'node:path';


export default class Cache {


  /**
   * @property {NodeCache} cacheObj The cache object using Node package.
   */
  #cacheObj = {};


  /**
   * @property {object} options The options.
   */
  #options = {};


  /**
   * 
   * @param {object} options Accept arguments.
   * @param {string} options.cacheJsonPath The cache JSON file full path. This file will be use for persistent cache across process end/start.
   * @param {object} options.cacheOptions The cache options. Currently use node-cache, see https://www.npmjs.com/package/node-cache.
   */
  constructor({ } = {}) {
    const defaults = {
      cacheJsonPath: path.resolve('node_modules/.cache/muon/cache.json'),
      cacheOptions: {},
    }

    this.#options = {
      ...defaults,
      ...arguments[0]
    }

    this.#prepareCacheFolder();

    this.#cacheObj = new NodeCache(this.#options.cacheOptions);
    this.#restoreCacheFile();
    this.#listenEvents();
  }// constructor


  /**
   * Listen cache class events to work.
   * 
   * @private This method was called from `constructor()`.
   */
  #listenEvents() {
    this.#cacheObj.on('set', (key, value) => {
      this.#writeAllCacheData(this.#cacheObj.data);
    });

    this.#cacheObj.on('del', (key, value) => {
      this.#writeAllCacheData(this.#cacheObj.data);
    });

    this.#cacheObj.on('expired', (key, value) => {
      this.#writeAllCacheData(this.#cacheObj.data);
    });

    this.#cacheObj.on('flush', () => {
      this.#writeAllCacheData(this.#cacheObj.data);
    });
  }// listenEvents


  /**
   * Prepare cache JSON file.
   * 
   * @private This method was called from `#prepareCacheFolder()`.
   */
  #prepareCacheFile() {
    const content = {};

    this.#writeAllCacheData(content);
  }// prepareCacheFile


  /**
   * Prepare cache folder where JSON cache file will be store.
   * 
   * @private This method was called from `constructor()`.
   * @returns {void}
   */
  #prepareCacheFolder() {
    if (fs.existsSync(this.#options.cacheJsonPath)) {
      // if file is already exists.
      // do nothing.
      return;
    }

    const cacheDir = path.dirname(this.#options.cacheJsonPath);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
      this.#prepareCacheFile();
    }

    // check again.
    if (!fs.existsSync(cacheDir)) {
      // if still not exists.
      throw new Error('The cache folder is not exists and could not be created. (' + cacheDir + ')');
    }
  }// prepareCacheFolder


  /**
   * Restore cache file.
   * 
   * @private This method was called from `constructor()`.
   */
  #restoreCacheFile() {
    const JSONContent = fs.readFileSync(
      this.#options.cacheJsonPath,
      {
        'encoding': 'utf8',
        'flag': 'r',
      }
    );

    this.#cacheObj.data = JSON.parse(JSONContent);
  }// restoreCacheFile


  /**
   * Write all cache data to JSON file.
   * 
   * @private This method was called from `#listenEvents()`, `#prepareCacheFile()`.
   * @param {mixed} data The data to write.
   */
  #writeAllCacheData(data) {
    const dataJSON = JSON.stringify(data, undefined, 4);

    fs.writeFileSync(
      this.#options.cacheJsonPath,
      dataJSON,
      {
        'encoding': 'utf8',
      }
    );
  }// writeAllCacheData


  /**
   * Returns the cache object on `#cacheObj` property.
   * 
   * @returns {object} Returns the cache object on `#cacheObj` property.
   */
  cacheObj() {
    return this.#cacheObj;
  }// cacheObj

}