class _InMemoryWardrobeModel {
  static item_id = 1;

  constructor() {
    this.items = [];
  }

  async create(item) {
    item.item_id = _InMemoryWardrobeModel.item_id++;
    item.created_at = new Date();
    item.updated_at = new Date();
    item.times_worn = item.times_worn || 0;
    item.is_favorite = item.is_favorite || false;
    this.items.push(item);
    return item;
  }

  async read(id = null) {
    if (id) {
      return this.items.find((item) => item.item_id === id);
    }

    return this.items;
  }

  async update(item) {
    const index = this.items.findIndex((i) => i.item_id === item.item_id);
    if (index === -1) {
      return null;
    }

    item.updated_at = new Date();
    this.items[index] = { ...this.items[index], ...item };
    return this.items[index];
  }

  async markAsWorn(id) {
    const item = this.items.find((i) => i.item_id === id);
    if (!item) {
      return null;
    }

    item.times_worn++;
    item.updated_at = new Date();
    return item;
  }

  async delete(item = null) {
    if (item === null) {
      this.items = [];
      return;
    }

    const index = this.items.findIndex((i) => i.item_id === item.item_id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    return item;
  }
}

const InMemoryWardrobeModel = new _InMemoryWardrobeModel();

export default InMemoryWardrobeModel;
