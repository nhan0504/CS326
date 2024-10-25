import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class WardrobeViewComponent extends BaseComponent {
  #container = null;

  constructor(WardrobeViewData = {}) {
    super();
    this.WardrobeViewData = WardrobeViewData;
  }

  render() {
    // Create the main container
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'wardrobeView';

    const title = document.createElement('h1');
    title.textContent = 'Wardrobe';

    const text = document.createElement('p');
    text.textContent = 'Text here!';

    this.#container.appendChild(title);
    this.#container.appendChild(text);

    return this.#container;
  }
}
