import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { getTestWardrobeItems } from "../../testing/TestData.js";
import { loadTestWardrobeItems } from "../../testing/TestData.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";
export class LogViewComponent extends BaseComponent {
  #container = null;
  #wardrobeItems = [];
  constructor(LogViewData = {}) {
    super();
    this.LogViewData = LogViewData;
    this.loadCSS("LogViewComponent");
  }
  render() {

    // Create the main container
    this.#container = document.createElement('div');
    this.#container.classList.add('view');
    this.#container.id = 'logView';
    this.#container.style.display = "none";

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Clothes';
    let tempWardrobeItems = getTestWardrobeItems();
    addButton.addEventListener('click', () => {
      this.addClothes(getTestWardrobeItems(),"notes");
      //add log, apparently we are just adding all items till add function is created
    });
    // Create the log container
    const logContainer = document.createElement("div");
    logContainer.classList.add("log-container");
    const title = document.createElement('h1');
    title.textContent = 'Log';
    const text = document.createElement('p');
    text.textContent = 'Clothing list down here';
    this.#container.appendChild(title);
    const outfitListDiv = this.createOutfitList();
    logContainer.appendChild(outfitListDiv);
    this.#container.appendChild(logContainer);
    this.#container.appendChild(addButton);
    this.#container.appendChild(text);
    tempWardrobeItems.shift();
    //testing out log
    this.addClothes(tempWardrobeItems,"test items");
    return this.#container;
  }
  createOutfitList()
  {
    const logItem= document.createElement("div");
    logItem.classList.add('logItem');
    logItem.id = 'logItem';
    const text = document.createElement('p');
    text.textContent ="Coming soon:D";
    logItem.appendChild(text);
    return logItem;
  }
  addClothes(tempWardrobeItems,msg)
  {
    if (tempWardrobeItems.length === 0) {
      alert("No clothes");
      return;
    }
    const logItem= document.createElement("div");
    logItem.classList.add('logItem');
    logItem.id = 'logItem';

    const logInfo= document.createElement("div");
    logInfo.classList.add('logInfo');

    const text = document.createElement('p');
    const date = document.createElement('p');
    const t = new Date();
    date.textContent = new Date(t.getTime());
    text.textContent = msg;
    const logGrid = document.createElement("div");
    logGrid.classList.add("logGrid");
    
    const heartItem = document.createElement("div");
    heartItem.classList.add("heartItem");
    const heartIcon = document.createElement("span");
    heartIcon.classList.add("favorite-icon");
      heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
      // Make the favorite button red and update the item when clicked
      heartIcon.onclick = function () {
        if (heartIcon.classList.contains("favorite-icon")) {
          heartIcon.classList.remove("favorite-icon");
          heartIcon.classList.add("favorite-icon-red");
          item.favorite();
        } else {
          heartIcon.classList.remove("favorite-icon-red");
          heartIcon.classList.add("favorite-icon");
          item.unfavorite();
        }
      };
    // Create each wardrobe item and add it to the grid
    tempWardrobeItems.forEach((item) => {
      // Crate the item container
      const logClothesItem = document.createElement("div");
      logClothesItem.classList.add("logClothesItem");
      // Add item image
      const image = document.createElement("img");
      image.classList.add("logClothesItemImage");
      image.src = item.image;
      image.alt = item.name;
      logClothesItem.appendChild(image);
      // Add item name
      const name = document.createElement("p");
      name.textContent = item.name;
      // Add item to the grid
      logClothesItem.appendChild(name);
      logGrid.appendChild(logClothesItem);
    });
    logItem.appendChild(date);
    logInfo.appendChild(text);
    logInfo.appendChild(heartIcon);
    logInfo.appendChild(heartItem);
    logItem.appendChild(logInfo);
    logItem.appendChild(logGrid);
    this.#container.appendChild(logItem);
  }
}
