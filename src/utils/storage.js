/** Class representing a storage */
export class Storage {
  /**
   * Create a Storage
   * @param {Object} storage - object implemented base functions: setItem, getItem, removeItem
   */
  constructor(storage) {
    this._storage = storage || localStorage;
  }

  /**
   * Saves item's value with a key to storage
   * @param  {string} key - key of the item
   * @param  {string} value - value of the item
   */
  async setItem(key, value) {
    await this._storage.setItem(key, value);
  }

  /**
   * Saves list of items to the storage
   * @param  {{key: string, value: string}[]} items - items to save
   */
  setItems(items) {
    items.forEach(async item => {
      await this.setItem(item.key, item.value);
    });
  }

  /**
   * Gets item from the storage
   * @param   {string} key - key of the item
   * @param   {string} defaultValue - default value that will be returned
   * @returns {string} value from storage
   */
  async getItem(key, defaultValue) {
    const value = await this._storage.getItem(key);
    return !!value ? value : defaultValue;
  }

  /**
   * Removes item from the storage
   * @param   {string} key - key of the item to remove
   */
  async removeItem(key) {
    await this._storage.removeItem(key);
  }

  /**
   * Removes list of items from the storage
   * @param  {string[]} keys - item keys to remove
   */
  removeItems(keys) {
    keys.forEach(async key => {
      await this.removeItem(key);
    });
  }
}
