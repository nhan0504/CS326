import { NavBarComponent } from './components/NavBarComponent/NavBarComponent.js';
import { LogViewComponent } from './components/LogViewComponent/LogViewComponent.js';
import { WardrobeViewComponent } from './components/WardrobeViewComponent/WardrobeViewComponent.js';
import { StatsViewComponent } from './components/StatsViewComponent/StatsViewComponent.js';
import { SuggestionsViewComponent } from './components/SuggestionsViewComponent/SuggestionsViewComponent.js';
import { LoginViewComponent } from './components/LoginViewComponent/LoginViewComponent.js';
import { setId, setUsername, getId } from './models/User.js';

const top = document.getElementById('top');
const main = document.getElementById('views');

// Create nav bar
const navBar = new NavBarComponent();
top.appendChild(navBar.render());

// Create views
const logView = new LogViewComponent();
const wardrobeView = new WardrobeViewComponent();
const statsView = new StatsViewComponent();
const suggestionsView = new SuggestionsViewComponent();
const loginView = new LoginViewComponent();

main.appendChild(logView.render());
main.appendChild(wardrobeView.render());
main.appendChild(statsView.render());
main.appendChild(suggestionsView.render());
main.appendChild(loginView.render());

document.addEventListener("DOMContentLoaded", async () => {
  // Create nav bar/view logic
  const navigate = (viewId) => {
    if (getId() != null)
    {
      document.querySelectorAll(".view").forEach(view => view.style.display = "none");
      document.getElementById(viewId).style.display = "block";
    }
  };

  document.getElementById("logo").addEventListener("click", () => navigate(`logView`));

  const buttons = ["log", "wardrobe", "stats", "suggestions"];
  buttons.forEach(id => {
    document.getElementById(id).addEventListener("click", () => navigate(`${id}View`));
  });

  if (getId() == null) {
    const viewsContainer = document.getElementById("views");

    if (viewsContainer) {
      const loginPromptDiv = document.createElement("div");
      loginPromptDiv.textContent = "Please log in to access this page.";
      
      viewsContainer.appendChild(loginPromptDiv);
    }
  }

  // Get user ID
  try {
    const response = await fetch("http://127.0.0.1:4000/auth/user", {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setId(data.googleId);
      setUsername(data.username);

      // Initialize with the home view
      navigate("logView");
    } else {
      console.error("Failed to fetch user data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
