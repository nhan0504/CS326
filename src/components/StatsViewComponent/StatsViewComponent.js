import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class StatsViewComponent extends BaseComponent {
  #container = null;

  constructor(StatsViewData = {}) {
    super();
    this.StatsViewData = StatsViewData;
  }

  render() {
    // Create the main container
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'statsView';

    const title = document.createElement('h1');
    title.textContent = 'Stats';

    const text = document.createElement('p');
    text.textContent = 'Text here!';

    this.#container.appendChild(title);
    this.#container.appendChild(text);

    return this.#container;
  }
}
