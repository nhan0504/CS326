import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class SuggestionsViewComponent extends BaseComponent {
  #container = null;

  constructor(SuggestionsViewData = {}) {
    super();
    this.SuggestionsViewData = SuggestionsViewData;
  }

  render() {
    // Create the main container
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'suggestionsView';

    const title = document.createElement('h1');
    title.textContent = 'Suggestions';

    const text = document.createElement('p');
    text.textContent = 'Text here!';

    this.#container.appendChild(title);
    this.#container.appendChild(text);

    return this.#container;
  }
}
