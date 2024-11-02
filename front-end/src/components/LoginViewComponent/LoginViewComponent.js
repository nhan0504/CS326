import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class LoginViewComponent extends BaseComponent {
  #container = null;

  constructor(LoginViewData = {}) {
    super();
    this.LoginViewData = LoginViewData;
  }

  render() {
    // Create the main container
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'loginView';

    const title = document.createElement('h1');
    title.textContent = 'Login';

    const text = document.createElement('p');
    text.textContent = 'Text here!';

    this.#container.appendChild(title);
    this.#container.appendChild(text);

    return this.#container;
  }
}
