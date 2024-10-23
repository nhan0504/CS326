document.addEventListener("DOMContentLoaded", () => {
  function navigate(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = "none";
    });

    // Show the requested view
    document.getElementById(viewId).style.display = "block";
  }

  document
    .getElementById("logo")
    .addEventListener("click", () => navigate("homeView"));
  document
    .getElementById("home")
    .addEventListener("click", () => navigate("homeView"));
  document
    .getElementById("log")
    .addEventListener("click", () => navigate("logView"));
  document
    .getElementById("wardrobe")
    .addEventListener("click", () => navigate("wardrobeView"));
  document
    .getElementById("stats")
    .addEventListener("click", () => navigate("statsView"));
  document
    .getElementById("suggestions")
    .addEventListener("click", () => navigate("suggestionsView"));
  document
    .getElementById("login")
    .addEventListener("click", () => navigate("loginView"));

  // Initialize with the home view
  navigate("homeView");
});
