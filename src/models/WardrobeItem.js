export class WardrobeItem {
    constructor(item_id, user_id, image, name, cost, size, category, occasion, seasons, brand, times_worn = 0, created_at = new Date(), updated_at = new Date()) {
        this.item_id = item_id;
        this.user_id = user_id;
        this.image = image;
        this.name = name;
        this.cost = cost;
        this.size = size;
        this.category = category;
        this.occasion = occasion;
        this.seasons = seasons;
        this.brand = brand;
        this.times_worn = times_worn;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
  
    updateItem(details) {
        Object.assign(this, details);
        this.updated_at = new Date();
    }
  
    wear() {
        this.times_worn++;
        this.updated_at = new Date();
    }
  
    toJSON() {
        return {
            item_id: this.item_id,
            user_id: this.user_id,
            image: this.image,
            name: this.name,
            cost: this.cost,
            size: this.size,
            category: this.category,
            occasion: this.occasion,
            seasons: this.seasons,
            brand: this.brand,
            times_worn: this.times_worn,
            created_at: this.created_at.toISOString(),
            updated_at: this.updated_at.toISOString(),
        };
    }
}
