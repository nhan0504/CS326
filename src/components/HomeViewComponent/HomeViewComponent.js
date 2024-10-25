import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class HomeViewComponent extends BaseComponent {
  #container = null;

  constructor(HomeViewData = {}) {
    super();
    this.HomeViewData = HomeViewData;
  }

  render() {
    // Create the main container
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'homeView';

    const title = document.createElement('h1');
    title.textContent = 'Welcome to ClosetIQ';

    const text = document.createElement('p');
    text.textContent = 'Track your wardrobe, plan outfits, and see your style statistics all in one place.';

    this.#container.appendChild(title);
    this.#container.appendChild(text);

    return this.#container;
  }
}
