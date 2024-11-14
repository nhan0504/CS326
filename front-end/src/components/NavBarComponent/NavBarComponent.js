import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class NavBarComponent extends BaseComponent {
  #container = null;

  constructor(NavBarData = {}) {
    super();
    this.NavBarData = NavBarData;
    this.loadCSS('NavBarComponent');
  }

  render() {
    // Create the main container
    this.#container = document.createElement('nav');

    // Create the logo section
    const logo = document.createElement('span');
    logo.id = 'logo';

    const logoImg = document.createElement('img');
    logoImg.src = 'img/logo.png';
    logoImg.alt = 'ClosetIQ Logo';
    logoImg.style.height = '40px';
    logoImg.style.verticalAlign = 'middle';

    logo.appendChild(logoImg);
    logo.appendChild(document.createTextNode(' ClosetIQ'));

    // Create the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const buttons = [
      { id: 'log', text: 'Log' },
      { id: 'wardrobe', text: 'Wardrobe' },
      { id: 'stats', text: 'Stats' },
      { id: 'suggestions', text: 'Suggestions' },
      { id: 'login', text: 'Log In' }
    ];

    // Create and append buttons
    buttons.forEach(({ id, text }) => {
      const button = document.createElement('button');
      button.id = id;
      button.textContent = text;
      buttonContainer.appendChild(button);
    });

    // Append the logo and buttons to the main container
    this.#container.appendChild(logo);
    this.#container.appendChild(buttonContainer);

    return this.#container;
  }
}
