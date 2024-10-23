class OutfitEntry {
    constructor(outfit_id, user_id, wardrobe_item_ids, note, date = new Date(), created_at = new Date(), updated_at = new Date()) {
        this.outfit_id = outfit_id;
        this.user_id = user_id;
        this.wardrobe_item_ids = wardrobe_item_ids;
        this.note = note;
        this.date = date;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    updateOutfit(details) {
        Object.assign(this, details);
        this.updated_at = new Date();
    }

    toJSON() {
        return {
            outfit_id: this.outfit_id,
            user_id: this.user_id,
            wardrobe_item_ids: this.wardrobe_item_ids,
            note: this.note,
            date: this.date.toISOString(),
            created_at: this.created_at.toISOString(),
            updated_at: this.updated_at.toISOString(),
        };
    }
}

module.exports = OutfitEntry;
