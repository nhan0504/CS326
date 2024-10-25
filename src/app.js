import { NavBarComponent } from './components/NavBarComponent/NavBarComponent.js';
import { HomeViewComponent } from './components/HomeViewComponent/HomeViewComponent.js';
import { LogViewComponent } from './components/LogViewComponent/LogViewComponent.js';
import { WardrobeViewComponent } from './components/WardrobeViewComponent/WardrobeViewComponent.js';
import { StatsViewComponent } from './components/StatsViewComponent/StatsViewComponent.js';
import { SuggestionsViewComponent } from './components/SuggestionsViewComponent/SuggestionsViewComponent.js';
import { LoginViewComponent } from './components/LoginViewComponent/LoginViewComponent.js';

const top = document.getElementById('top');
const main = document.getElementById('views');

// Create nav bar
const navBar = new NavBarComponent();
top.appendChild(navBar.render());

// Create views
const homeView = new HomeViewComponent();
const logView = new LogViewComponent();
const wardrobeView = new WardrobeViewComponent();
const statsView = new StatsViewComponent();
const suggestionsView = new SuggestionsViewComponent();
const loginView = new LoginViewComponent();

main.appendChild(homeView.render());
main.appendChild(logView.render());
main.appendChild(wardrobeView.render());
main.appendChild(statsView.render());
main.appendChild(suggestionsView.render());
main.appendChild(loginView.render());

document.addEventListener("DOMContentLoaded", () => {
  // Create nav bar/view logic
  const navigate = (viewId) => {
    document.querySelectorAll(".view").forEach(view => view.style.display = "none");
    document.getElementById(viewId).style.display = "block";
  };

  const buttons = ["logo", "home", "log", "wardrobe", "stats", "suggestions", "login"];
  buttons.forEach(id => {
    document.getElementById(id).addEventListener("click", () => navigate(`${id}View`));
  });

  // Initialize with the home view
  navigate("homeView");
});
