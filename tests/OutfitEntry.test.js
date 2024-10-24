import { OutfitEntry } from "../src/models/OutfitEntry.js";

describe('OutfitEntry', () => {
    let outfit;
    
    beforeEach(() => {
        outfit = new OutfitEntry('outfit1', 'user1', ['item1', 'item2'], 'Casual outfit');
    });

    test('should create an instance of OutfitEntry with given attributes', () => {
        expect(outfit.outfit_id).toBe('outfit1');
        expect(outfit.user_id).toBe('user1');
        expect(outfit.wardrobe_item_ids).toEqual(['item1', 'item2']);
        expect(outfit.note).toBe('Casual outfit');
        expect(outfit.date).toBeInstanceOf(Date);
        expect(outfit.created_at).toBeInstanceOf(Date);
        expect(outfit.updated_at).toBeInstanceOf(Date);
    });

    test('should update outfit details correctly', () => {
        outfit.updateOutfit({ note: 'Updated note', wardrobe_item_ids: ['item3'] });
        expect(outfit.note).toBe('Updated note');
        expect(outfit.wardrobe_item_ids).toEqual(['item3']);
        expect(outfit.updated_at).toBeInstanceOf(Date);
    });

    test('should convert outfit to JSON correctly', () => {
        const json = outfit.toJSON();
        expect(json.outfit_id).toBe('outfit1');
        expect(json.user_id).toBe('user1');
        expect(json.wardrobe_item_ids).toEqual(['item1', 'item2']);
        expect(json.note).toBe('Casual outfit');
        expect(typeof json.date).toBe('string');
        expect(typeof json.created_at).toBe('string');
        expect(typeof json.updated_at).toBe('string');
    });
});
