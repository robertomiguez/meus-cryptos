const DB_NAME = 'coindb'
const DB_VERSION = 1
let DB

export default {

  async getDb () {
    return new Promise((resolve, reject) => {
      if (DB) { return resolve(DB) }
      // console.log('OPENING DB', DB)
      const request = window.indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = e => {
        // console.log('Error opening db', e)
        reject(new Error('Error'))
      }

      request.onsuccess = e => {
        DB = e.target.result
        resolve(DB)
      }

      request.onupgradeneeded = e => {
        // console.log('onupgradeneeded')
        const db = e.target.result
        db.createObjectStore('coins', { autoIncrement: true, keyPath: 'id' })
      }
    })
  },
  async deleteCoin (coin) {
    const db = await this.getDb()

    return new Promise(resolve => {
      const trans = db.transaction(['coins'], 'readwrite')
      trans.oncomplete = () => {
        resolve()
      }

      const store = trans.objectStore('coins')
      store.delete(coin.id)
    })
  },
  async getCoins () {
    const db = await this.getDb()

    return new Promise(resolve => {
      const trans = db.transaction(['coins'], 'readonly')
      trans.oncomplete = () => {
        resolve(coins)
      }

      const store = trans.objectStore('coins')
      const coins = []

      store.openCursor().onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
          coins.push(cursor.value)
          cursor.continue()
        }
      }
    })
  },

  async saveCoin (coin) {
    const db = await this.getDb()

    return new Promise(resolve => {
      const trans = db.transaction(['coins'], 'readwrite')
      trans.oncomplete = () => {
        resolve()
      }

      const store = trans.objectStore('coins')
      store.put(coin)
    })
  }

}
