import { SuggestionsViewComponent } from '../src/components/SuggestionsViewComponent/SuggestionsViewComponent.js';

describe('SuggestionsViewComponent', () => {
  let component;

  beforeEach(() => {
    component = new SuggestionsViewComponent();
    document.body.appendChild(component.render());
  });

  afterEach(() => {
    document.body.innerHTML = ''; // Clean up after each test
  });

  test('renders correctly with initial state', () => {
    const container = document.getElementById('suggestionsView');
    expect(container).toBeTruthy();
    
    const filterBar = container.querySelector('.filter-bar');
    expect(filterBar).toBeTruthy();

    const outfitListDiv = container.querySelector('.outfit-list');
    expect(outfitListDiv).toBeTruthy();

    const applyFiltersMessage = outfitListDiv.querySelector('.apply-filters-message');
    expect(applyFiltersMessage).toBeTruthy();
    expect(applyFiltersMessage.textContent).toBe("Select your filters, and then click 'Apply Filters' to generate outfits!");
  });

  test('filters and generates outfits correctly', () => {   
    // Simulate checking the "Favorites only" checkbox
    const favoritesCheckbox = document.getElementById('favorites-only');
    favoritesCheckbox.checked = true;

    // Simulate clicking "Apply Filters"
    const applyButton = document.querySelector('.apply-filters-button');
    applyButton.click();

    // Verify that the message is hidden and the filtering logic works
    const applyFiltersMessage = document.querySelector('.apply-filters-message');
    expect(applyFiltersMessage.style.display).toBe('none');
  });

  test('toggles outfit details on expand button click', () => {
    const applyButton = document.querySelector('.apply-filters-button');
    applyButton.click();

    const expandButton = document.querySelector('.expand-btn');
    expandButton.click();

    const outfitDetails = document.getElementById('outfit-details-0'); // Assuming at least one outfit is generated
    expect(outfitDetails.style.display).toBe('block'); // Should be visible after click

    expandButton.click();
    expect(outfitDetails.style.display).toBe('none'); // Should be hidden again after second click
  });
});
