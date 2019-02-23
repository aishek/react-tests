export const NullStorage = {
  get: () => undefined,
  set: () => true
}

export class MemoryStorage {
  constructor () {
    this.data = {}
  }

  set (key, value) {
    this.data[key] = value.toString()
  }

  get (key) {
    return this.data[key]
  }
}
