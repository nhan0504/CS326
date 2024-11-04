import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { getTestWardrobeItems } from "../../testing/TestData.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";

export class StatsViewComponent extends BaseComponent {
  #container = null;

  constructor(StatsViewData = {}) {
    super();
    this.StatsViewData = StatsViewData;
    this.wardrobeService = new WardrobeRepositoryService();
    this.wardrobeItems = [];
    this.loadWardrobeItems();
    this.loadCSS("StatsViewComponent");
  }

  async loadWardrobeItems() {
    try {
      // Use test data
      // this.wardrobeItems = getTestWardrobeItems();

      // Use data from indexedDB
      await this.wardrobeService.initDB();
      this.wardrobeItems = await this.wardrobeService.loadWardrobeItemsFromDB(); 
      this.render(); 
    } catch (error) {
      console.error('Error loading outfits:', error);
    }
  }

  // Get 5 most worn items
  getMostWornItems(wardrobeItems) {
    return wardrobeItems.sort((a, b) => b.times_worn - a.times_worn).slice(0, 5); 
  }

  getLeastWornItems(wardrobeItems) {
    return wardrobeItems.filter(item => item.times_worn === 0 || item.times_worn <= 2); 
  }

  getCostPerWear(item) {
    return item.times_worn > 0 ? (item.cost / item.times_worn).toFixed(2) : item.cost; 
  }

  getWearFrequencyByCategory(outfits) {
    const categoryMap = {};
    outfits.forEach(item => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = 0;
      }
      categoryMap[item.category] += item.times_worn;
    });
    return categoryMap;
  }

  getItemCountByCategory(wardrobeItems) {
    const categoryCount = {};
    wardrobeItems.forEach(item => {
      if (!categoryCount[item.category]) {
        categoryCount[item.category] = 0;
      }
      categoryCount[item.category] += 1;
    });
    return categoryCount;
  }

  renderChart(containerId, labels, data, label) {
    const ctx = document.getElementById(containerId);
    if (this[containerId]) {
      this[containerId].destroy();
    }

    this[containerId] = new Chart(ctx, {
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  renderDoughnutChart(containerId, labels, data) {
    const ctx = document.getElementById(containerId);
    if (this[containerId]) {
      this[containerId].destroy();
    }

    this[containerId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      },
    });
  }

  renderPieChart(containerId, labels, data) {
    const ctx = document.getElementById(containerId);
    if (this[containerId]) {
      this[containerId].destroy();
    }

    this[containerId] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        }
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

    const leftColumn = document.createElement('div');
    leftColumn.classList.add('column', 'left-column');

    const mostWornContainer = document.createElement('div');
    mostWornContainer.classList.add('chart-container');

    const leastWornContainer = document.createElement('div');
    leastWornContainer.classList.add('chart-container');

    const rightColumn = document.createElement('div');
    rightColumn.classList.add('column', 'right-column');

    const wearFrequencyContainer = document.createElement('div');
    wearFrequencyContainer.classList.add('chart-container');

    const itemsPerCategoryContainer = document.createElement('div');
    itemsPerCategoryContainer.classList.add('chart-container');

    // Most-worn items
    const mostWornTitle = document.createElement('h2');
    mostWornTitle.textContent = 'Top 5 most-worn Items';
    const mostWornCanvas = document.createElement('canvas');
    mostWornCanvas.id = 'mostWornChart';
    const mostWornItems = this.getMostWornItems(this.wardrobeItems);

    const mostWornLabels = mostWornItems.map(item => item.name);
    const mostWornData = mostWornItems.map(item => item.times_worn);

    const mostWornList = document.createElement('ul');
    mostWornItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Worn ${item.times_worn} times)`;
      mostWornList.appendChild(listItem);
    });

    // Least-worn items
    const leastWornTitle = document.createElement('h2');
    leastWornTitle.textContent = 'Least-worn or Never-worn Items';

    const leastWornCanvas = document.createElement('canvas');
    leastWornCanvas.id = 'leastWornChart';
    const leastWornItems = this.getLeastWornItems(this.wardrobeItems);

    const leastWornLabels = leastWornItems.map(item => item.name);
    const leastWornData = leastWornItems.map(item => item.times_worn);

    const leastWornList = document.createElement('ul');
    leastWornItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Worn ${item.times_worn} times) - Suggest to wear`;
      leastWornList.appendChild(listItem);
    });

    // Cost-per-wear
    const costPerWearTitle = document.createElement('h2');
    costPerWearTitle.textContent = 'Cost-per-wear for Each Item';
    const costPerWearList = document.createElement('ul');
    this.wardrobeItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name}: $${this.getCostPerWear(item)} per wear`;
      costPerWearList.appendChild(listItem);
    });

    // Wear frequency by category
    const wearFrequencyTitle = document.createElement('h2');
    wearFrequencyTitle.textContent = 'Wear Frequency by Category';
    const wearFrequencyCanvas = document.createElement('canvas');
    wearFrequencyCanvas.id = 'wearByCategoryChart';  
    const wearFrequency = this.getWearFrequencyByCategory(this.wardrobeItems);
    const categoryLabels = Object.keys(wearFrequency);
    const categoryValues = Object.values(wearFrequency);

    const wearFrequencyList = document.createElement('ul');
    
    for (const category in wearFrequency) {
      const listItem = document.createElement('li');
      listItem.textContent = `${category}: Worn ${wearFrequency[category]} times in total`;
      wearFrequencyList.appendChild(listItem);
    }

    // Items per category 
    const itemsPerCategoryTitle = document.createElement('h2');
    itemsPerCategoryTitle.textContent = 'Items per Category';
    const itemsPerCategoryCanvas = document.createElement('canvas');
    itemsPerCategoryCanvas.id = 'itemsPerCategoryChart';
    itemsPerCategoryCanvas.width = 350;
    const categoryCount = this.getItemCountByCategory(this.wardrobeItems);
    const itemCategoryLabels = Object.keys(categoryCount);
    const itemCategoryValues = Object.values(categoryCount);

    leftColumn.appendChild(mostWornTitle);
    leftColumn.appendChild(mostWornList);
    mostWornContainer.appendChild(mostWornCanvas);
    leftColumn.appendChild(mostWornContainer);
    leftColumn.appendChild(leastWornTitle);
    leftColumn.appendChild(leastWornList);
    leastWornContainer.appendChild(leastWornCanvas);
    leftColumn.appendChild(leastWornContainer);

    rightColumn.appendChild(costPerWearTitle);
    rightColumn.appendChild(costPerWearList);
    rightColumn.appendChild(wearFrequencyTitle);
    rightColumn.appendChild(wearFrequencyList);
    wearFrequencyContainer.appendChild(wearFrequencyCanvas);
    rightColumn.appendChild(wearFrequencyContainer);
    rightColumn.appendChild(itemsPerCategoryTitle);
    itemsPerCategoryContainer.appendChild(itemsPerCategoryCanvas);
    rightColumn.appendChild(itemsPerCategoryContainer);

    const columnsContainer = document.createElement('div');
    columnsContainer.classList.add('columns-container');
    columnsContainer.appendChild(leftColumn);
    columnsContainer.appendChild(rightColumn);

    this.#container.appendChild(title);
    this.#container.appendChild(columnsContainer);

    requestAnimationFrame(() => {
      this.renderChart('mostWornChart', mostWornLabels, mostWornData, 'Times Worn');
      this.renderChart('leastWornChart', leastWornLabels, leastWornData, 'Times Worn');
      this.renderDoughnutChart('wearByCategoryChart', categoryLabels, categoryValues);
      this.renderPieChart('itemsPerCategoryChart', itemCategoryLabels, itemCategoryValues);
    });

    return this.#container;
  }
}
