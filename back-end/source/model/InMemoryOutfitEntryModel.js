class _InMemoryOutfitModel {
  static outfit_id = 1;

  constructor() {
    this.outfits = [];
  }

  async create(outfit) {
    outfit.outfit_id = _InMemoryOutfitModel.outfit_id++;
    outfit.created_at = new Date();
    outfit.updated_at = new Date();
    this.outfits.push(outfit);
    return outfit;
  }

  async read(id = null) {
    if (id) {
      return this.outfits.find((outfit) => outfit.outfit_id === id);
    }

    return this.outfits;
  }

  async update(outfit) {
    const index = this.outfits.findIndex((o) => o.outfit_id === outfit.outfit_id);
    if (index === -1) {
      return null;
    }

    outfit.updated_at = new Date();
    this.outfits[index] = { ...this.outfits[index], ...outfit };
    return this.outfits[index];
  }

  async delete(outfit = null) {
    if (outfit === null) {
      this.outfits = [];
      return;
    }

    const index = this.outfits.findIndex((o) => o.outfit_id === outfit.outfit_id);
    if (index !== -1) {
      this.outfits.splice(index, 1);
    }
    return outfit;
  }
}

const InMemoryOutfitModel = new _InMemoryOutfitModel();


export default InMemoryOutfitModel;
