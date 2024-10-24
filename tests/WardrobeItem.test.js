import { WardrobeItem } from "../src/models/WardrobeItem.js";

describe('WardrobeItem', () => {
    let wardrobeItem;

    beforeEach(() => {
        wardrobeItem = new WardrobeItem(
            'item1',
            'user1',
            'image.jpg',
            'Blue T-shirt',
            20.00,
            'M',
            'Tops',
            'Casual',
            ['Spring', 'Summer'],
            'BrandA'
        );
    });

    test('should create an instance of WardrobeItem with given attributes', () => {
        expect(wardrobeItem.item_id).toBe('item1');
        expect(wardrobeItem.user_id).toBe('user1');
        expect(wardrobeItem.image).toBe('image.jpg');
        expect(wardrobeItem.name).toBe('Blue T-shirt');
        expect(wardrobeItem.cost).toBe(20.00);
        expect(wardrobeItem.size).toBe('M');
        expect(wardrobeItem.category).toBe('Tops');
        expect(wardrobeItem.occasion).toBe('Casual');
        expect(wardrobeItem.seasons).toEqual(['Spring', 'Summer']);
        expect(wardrobeItem.brand).toBe('BrandA');
        expect(wardrobeItem.times_worn).toBe(0);
        expect(wardrobeItem.created_at).toBeInstanceOf(Date);
        expect(wardrobeItem.updated_at).toBeInstanceOf(Date);
    });

    test('should update wardrobe item details correctly', () => {
        wardrobeItem.updateItem({ name: 'Red T-shirt', cost: 25.00 });
        expect(wardrobeItem.name).toBe('Red T-shirt');
        expect(wardrobeItem.cost).toBe(25.00);
        expect(wardrobeItem.updated_at).toBeInstanceOf(Date);
    });

    test('should increase times worn when wear is called', () => {
        wardrobeItem.wear();
        expect(wardrobeItem.times_worn).toBe(1);
        expect(wardrobeItem.updated_at).toBeInstanceOf(Date);
    });

    test('should convert wardrobe item to JSON correctly', () => {
        const json = wardrobeItem.toJSON();
        expect(json.item_id).toBe('item1');
        expect(json.user_id).toBe('user1');
        expect(json.image).toBe('image.jpg');
        expect(json.name).toBe('Blue T-shirt');
        expect(json.cost).toBe(20.00);
        expect(json.size).toBe('M');
        expect(json.category).toBe('Tops');
        expect(json.occasion).toBe('Casual');
        expect(json.seasons).toEqual(['Spring', 'Summer']);
        expect(json.brand).toBe('BrandA');
        expect(json.times_worn).toBe(0);
        expect(typeof json.created_at).toBe('string');
        expect(typeof json.updated_at).toBe('string');
    });
});
