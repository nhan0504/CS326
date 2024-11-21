import { WardrobeItem } from "../src/models/WardrobeItem.js";

describe('WardrobeItem', () => {
  let wardrobeItem;

  beforeEach(() => {
    wardrobeItem = new WardrobeItem({
      item_id: 'item1',
      user_id: 'user1',
      image: 'image.jpg',
      name: 'Blue T-shirt',
      cost: 20.00,
      size: 'M',
      category: 'tops',
      occasion: 'casual',
      seasons: ['Spring', 'Summer'],
      brand: 'BrandA',
    });
  });

  test('should create an instance of WardrobeItem with given attributes', () => {
    expect(wardrobeItem.item_id).toBe('item1');
    expect(wardrobeItem.user_id).toBe('user1');
    expect(wardrobeItem.image).toBe('image.jpg');
    expect(wardrobeItem.name).toBe('Blue T-shirt');
    expect(wardrobeItem.cost).toBe(20.00);
    expect(wardrobeItem.size).toBe('M');
    expect(wardrobeItem.category).toBe('tops');
    expect(wardrobeItem.occasion).toBe('casual');
    expect(wardrobeItem.seasons).toEqual(['Spring', 'Summer']);
    expect(wardrobeItem.brand).toBe('BrandA');
    expect(wardrobeItem.is_favorite).toBe(false);
    expect(wardrobeItem.times_worn).toBe(0);
    expect(wardrobeItem.created_at).toBeInstanceOf(Date);
    expect(wardrobeItem.updated_at).toBeInstanceOf(Date);
  });

  test('should update wardrobe item details correctly', () => {
    const initialUpdatedAt = wardrobeItem.updated_at;
    wardrobeItem.updateItem({ name: 'Red T-shirt', cost: 25.0 });

    expect(wardrobeItem.name).toBe('Red T-shirt');
    expect(wardrobeItem.cost).toBe(25.00);
    expect(wardrobeItem.updated_at).not.toBe(initialUpdatedAt);
    expect(wardrobeItem.updated_at).toBeInstanceOf(Date);
  });

  test('should increase times worn when wear is called', () => {
    const initialUpdatedAt = wardrobeItem.updated_at;
    wardrobeItem.wear();

    expect(wardrobeItem.times_worn).toBe(1);
    expect(wardrobeItem.updated_at).not.toBe(initialUpdatedAt);
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
    expect(json.category).toBe('tops');
    expect(json.occasion).toBe('casual');
    expect(json.seasons).toEqual(['Spring', 'Summer']);
    expect(json.brand).toBe('BrandA');
    expect(json.is_favorite).toBe(false);
    expect(json.times_worn).toBe(0);
    expect(typeof json.created_at).toBe('string');
    expect(typeof json.updated_at).toBe('string');
    expect(new Date(json.created_at)).toBeInstanceOf(Date);
    expect(new Date(json.updated_at)).toBeInstanceOf(Date);
  });
});
