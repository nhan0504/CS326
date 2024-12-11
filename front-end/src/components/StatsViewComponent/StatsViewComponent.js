import { Events } from '../../eventhub/Events.js';
import { getId } from "../../models/User.js";
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { getTestWardrobeItems } from "../../testing/TestData.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";

export class StatsViewComponent extends BaseComponent {
  #container = null;
  #mostWornItems = [];
  #leastWornItems = [];
  #costPerWear = [];
  #frequencyCategory = [];
  #itemCategory = [];

  constructor(StatsViewData = {}) {
    super();
    this.StatsViewData = StatsViewData;
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'statsView';
    this.wardrobeService = new WardrobeRepositoryService();
    this.wardrobeItems = [];
    this.loadWardrobeItems();
    this.loadCSS("StatsViewComponent");
    this.subscribeToWardrobeEvents();
  }

  async loadWardrobeItems() {
    try {
      // Use test data
      // this.wardrobeItems = getTestWardrobeItems();

      const loadingMessage = document.createElement('p');
      loadingMessage.textContent = 'Loading items from wardrobe ...';
      this.#container.appendChild(loadingMessage);

      // Use data from indexedDB
      await this.wardrobeService.initDB();
      this.wardrobeItems = await this.wardrobeService.loadWardrobeItemsFromDB(); 

      loadingMessage.textContent = 'Rendering statistic ...';
      this.render(); 
    } catch (error) {
      console.error('Error loading outfits:', error);
    }
  }

  // Call the service to get all the statistic data on the wardrobe be displaying chart
  async loadStatData() {
    const user_id = getId();
    console.log(user_id)
    // Wait untill all promist resolve to display all chart
    const results = await Promise.all([
      this.wardrobeService.getMostWornItems(user_id),
      this.wardrobeService.getLeastWornItems(user_id),
      this.wardrobeService.getCostPerWear(user_id),
      this.wardrobeService.getFrequencyPerCategory(user_id),
      this.wardrobeService.getItemsPerCategory(user_id),
    ]);

    // Destructure the results into corresponding variables
    [this.#mostWornItems, this.#leastWornItems, this.#costPerWear, this.#frequencyCategory, this.#itemCategory] = results;
  }
  
  subscribeToWardrobeEvents() {
    document.addEventListener('StoreWardrobeItemSuccess', (event) => {
      this.loadWardrobeItems();
      this.loadStatData();
    });
  
    document.addEventListener('StoreWardrobeItemFailure', (event) => {
      console.error('Failed to store wardrobe item:');
    });

    document.addEventListener('UnStoreWardrobeItemSuccess', async () => {
      console.log('All wardrobe items cleared');
      this.loadWardrobeItems();
      this.loadStatData();
    });
  
    document.addEventListener('UnStoreWardrobeItemFailure', (event) => {
      console.error('Failed to clear wardrobe items:');
      alert('Failed to clear wardrobe items. Please try again.');
    });

    document.addEventListener(Events.UpdateUserId, () => {
      console.log("User id updated");
      this.loadStatData();
    });
  }

  /* Function to render bar chart
   * Param: 
   *   containerId: The id of the container that will contain the chart
   *   labels: The label of each column
   *   data: The value of each column
   *   label: The chart label
   */
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

  /* Function to render doughnut chart
   * Param: 
   *   containerId: The id of the container that will contain the chart
   *   labels: The label of each part in the chart
   *   data: The value of each part in the chart
   */
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

  /* Function to render pie chart
   * Param: 
   *   containerId: The id of the container that will contain the chart
   *   labels: The label of each piece in the chart
   *   data: The value of each piece in the chart
   */
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

  //Download all charts as one image
  downloadAllChartImage(containerId) {
    const container = document.getElementById(containerId);
    // Convert the captured canvas to an image and download it
    html2canvas(container, { backgroundColor: '#FFFFFF' }).then(canvas => {
      canvas.toBlob(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Clothing-stats.png';
        link.click();
      });
    });
  }

  render() {
    this.#container.innerHTML = '';

    if (!this.wardrobeItems.length) {
      const loadingMessage = document.createElement('p');
      loadingMessage.textContent = 'No items in wardrobe to display statistic.';
      this.#container.appendChild(loadingMessage);
      return this.#container;
    }

    const title = document.createElement('h1');
    title.classList.add('stats-title');
    title.textContent = 'Stats';

    // Divide the whole page into 2 columns
    // Create the container for the left column
    const leftColumn = document.createElement('div');
    leftColumn.classList.add('column', 'left-column');

    // Create the container for most worn chart
    const mostWornContainer = document.createElement('div');
    mostWornContainer.classList.add('chart-container');

    // Create the container for least worn chart
    const leastWornContainer = document.createElement('div');
    leastWornContainer.classList.add('chart-container');

    // Create the container for the left column
    const rightColumn = document.createElement('div');
    rightColumn.classList.add('column', 'right-column');

    // Create the container for wearing frequency for each category doughnut chart
    const wearFrequencyContainer = document.createElement('div');
    wearFrequencyContainer.classList.add('chart-container');

    // Create the container for number of item per category pie chart
    const itemsPerCategoryContainer = document.createElement('div');
    itemsPerCategoryContainer.classList.add('chart-container');

    // Most-worn items
    const mostWornTitle = document.createElement('h2');
    mostWornTitle.classList.add('chart-title');
    mostWornTitle.textContent = 'Top 5 most-worn Items';

    // Canvas to draw the most worn bar chart
    const mostWornCanvas = document.createElement('canvas');
    mostWornCanvas.id = 'mostWornChart';

    // Generate label and data for the most worn chart
    const mostWornLabels = this.#mostWornItems.map(item => item.name);
    const mostWornData = this.#mostWornItems.map(item => item.times_worn);

    // Create the list of most worn items
    const mostWornList = document.createElement('ul');
    this.#mostWornItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Worn ${item.times_worn} times)`;
      mostWornList.appendChild(listItem);
    });

    // Least-worn items
    const leastWornTitle = document.createElement('h2');
    leastWornTitle.classList.add('chart-title');
    leastWornTitle.textContent = 'Least-worn or Never-worn Items';

    // Canvas to draw the least worn bar chart
    const leastWornCanvas = document.createElement('canvas');
    leastWornCanvas.id = 'leastWornChart';

    // Generate label and data for the least worn chart
    const leastWornLabels = this.#leastWornItems.map(item => item.name);
    const leastWornData = this.#leastWornItems.map(item => item.times_worn);

    // Create the list of least worn items
    const leastWornList = document.createElement('ul');
    this.#leastWornItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Worn ${item.times_worn} times) - Suggest to wear`;
      leastWornList.appendChild(listItem);
    });

    // Cost-per-wear
    const costPerWearTitle = document.createElement('h2');
    costPerWearTitle.textContent = 'Cost-per-wear for Each Item';
    costPerWearTitle.classList.add('chart-title');

    // List out the cost per wear for each item
    const costPerWearList = document.createElement('ul');
    this.#costPerWear.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name}: $${item.cost_per_wear} per wear`;
      costPerWearList.appendChild(listItem);
    });

    // Wear frequency by category
    const wearFrequencyTitle = document.createElement('h2');
    wearFrequencyTitle.textContent = 'Wear Frequency by Category';
    wearFrequencyTitle.classList.add('chart-title');

    // Canvas to draw the wearing frequency by category doughnut chart
    const wearFrequencyCanvas = document.createElement('canvas');
    wearFrequencyCanvas.id = 'wearByCategoryChart';  

    // Generate label and data for the doughnut chart
    const categoryLabels = this.#frequencyCategory.map((item) => item.category);
    const categoryValues = this.#frequencyCategory.map((item) => item.total_wear);

    // Create the list wearing frequency for each category
    const wearFrequencyList = document.createElement('ul');
    this.#frequencyCategory.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.category}: Worn ${item.total_wear} times in total`;
      wearFrequencyList.appendChild(listItem);
    })

    // Items per category 
    const itemsPerCategoryTitle = document.createElement('h2');
    itemsPerCategoryTitle.textContent = 'Items per Category';
    itemsPerCategoryTitle.classList.add('chart-title');

    // Canvas to draw the number of item per category pie chart
    const itemsPerCategoryCanvas = document.createElement('canvas');
    itemsPerCategoryCanvas.id = 'itemsPerCategoryChart';

    // Generate label and data for the pie chart
    const itemCategoryLabels = this.#itemCategory.map((item) => item.category);
    const itemCategoryValues = this.#itemCategory.map((item) => item.item_count);

    // Left side will have most worn and least worn bar chart
    leftColumn.appendChild(mostWornTitle);
    leftColumn.appendChild(mostWornList);
    mostWornContainer.appendChild(mostWornCanvas);
    leftColumn.appendChild(mostWornContainer);
    leftColumn.appendChild(leastWornTitle);
    leftColumn.appendChild(leastWornList);
    leastWornContainer.appendChild(leastWornCanvas);
    leftColumn.appendChild(leastWornContainer);

    // Right side have the list of cost per wear, doughnut chart for wear frequency and pie chart for num items per category
    rightColumn.appendChild(costPerWearTitle);
    rightColumn.appendChild(costPerWearList);
    rightColumn.appendChild(wearFrequencyTitle);
    rightColumn.appendChild(wearFrequencyList);
    wearFrequencyContainer.appendChild(wearFrequencyCanvas);
    rightColumn.appendChild(wearFrequencyContainer);
    rightColumn.appendChild(itemsPerCategoryTitle);
    itemsPerCategoryContainer.appendChild(itemsPerCategoryCanvas);
    rightColumn.appendChild(itemsPerCategoryContainer);

    // Columns container to hold left and right column
    const columnsContainer = document.createElement('div');
    columnsContainer.id = 'stats-container';
    columnsContainer.classList.add('columns-container');
    columnsContainer.appendChild(leftColumn);
    columnsContainer.appendChild(rightColumn);

    // Add the columns container to the main container
    this.#container.appendChild(title);
    this.#container.appendChild(columnsContainer);

    // Create a download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download charts';
    downloadButton.id = 'downloadButton';
    this.#container.appendChild(downloadButton);

    // Render the chart
    requestAnimationFrame(() => {
      this.renderChart('mostWornChart', mostWornLabels, mostWornData, 'Times Worn');
      this.renderChart('leastWornChart', leastWornLabels, leastWornData, 'Times Worn');
      this.renderDoughnutChart('wearByCategoryChart', categoryLabels, categoryValues);
      this.renderPieChart('itemsPerCategoryChart', itemCategoryLabels, itemCategoryValues);
    });

    // Function to handle click to download charts
    downloadButton.addEventListener('click', () => {
      this.downloadAllChartImage('stats-container');
    });

    return this.#container;
  }
}