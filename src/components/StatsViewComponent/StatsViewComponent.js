import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { getTestWardrobeItems } from "../../testing/TestData.js";

export class StatsViewComponent extends BaseComponent {
  #container = null;

  constructor(StatsViewData = {}) {
    super();
    this.StatsViewData = StatsViewData;
    this.wardrobeItems = [];
    this.loadWardrobeItems();
  }

  async loadWardrobeItems() {
    try {
      this.wardrobeItems = getTestWardrobeItems();
      this.render(); 
    } catch (error) {
      console.error('Error loading outfits:', error);
    }
  }

  // Get 5 most worn items
  getMostWornItems(wardrobeItems) {
    return wardrobeItems.sort((a, b) => b.times_worn - a.times_worn).slice(0, 5); 
  }

  renderChart(containerId, labels, data, label) {
    const ctx = document.getElementById(containerId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        maintainAspectRatio: true,
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  render() {
    if (!this.wardrobeItems.length) {
      const loadingMessage = document.createElement('p');
      loadingMessage.textContent = 'Loading statistics...';
      this.#container.appendChild(loadingMessage);
      return this.#container;
    }

    if (this.#container) {
      this.#container.innerHTML = '';
    } else {
      this.#container = document.createElement('div');
      this.#container.classList.add('view');
      this.#container.id = 'statsView';
    }

    const title = document.createElement('h1');
    title.textContent = 'Stats';

    // Most-worn items
    const mostWornTitle = document.createElement('h2');
    mostWornTitle.textContent = 'Top 5 most-worn Items';
    const mostWornCanvas = document.createElement('canvas');
    mostWornCanvas.id = 'mostWornChart';
    mostWornCanvas.width = 500;
    const mostWornItems = this.getMostWornItems(this.wardrobeItems);

    const mostWornLabels = mostWornItems.map(item => item.name);
    const mostWornData = mostWornItems.map(item => item.times_worn);

    const mostWornList = document.createElement('ul');
    mostWornItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Worn ${item.times_worn} times)`;
      mostWornList.appendChild(listItem);
    });

    const text = document.createElement('p');
    text.textContent = 'Text here!';

    this.#container.appendChild(title);
    this.#container.appendChild(text);
    this.#container.appendChild(mostWornTitle);
    this.#container.appendChild(mostWornList);
    this.#container.appendChild(mostWornCanvas);

    setTimeout(() => {
      this.renderChart('mostWornChart', mostWornLabels, mostWornData, 'Times Worn');
    }, 0);

    return this.#container;
  }
}
