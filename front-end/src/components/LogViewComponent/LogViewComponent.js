import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class LogViewComponent extends BaseComponent {
  #container = null;

  constructor(LogViewData = {}) {
    super();
    this.LogViewData = LogViewData;
  }

  render() {
    // Create the main container
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'logView';

    const title = document.createElement('h1');
    title.textContent = 'Log';

    const text = document.createElement('p');
    text.textContent = 'Text here!';

    this.#container.appendChild(title);
    this.#container.appendChild(text);

    return this.#container;
  }
}
