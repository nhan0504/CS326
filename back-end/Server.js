import express from "express";
import OutfitRoutes from "./routes/outfitRoutes.js";
import ItemRoutes from "./routes/itemRoutes.js";

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  // Configure middleware for static files and JSON parsing
  configureMiddleware() {
    // Serve static files from the front-end
    this.app.use(express.static("../front-end/source"));

    // Parse JSON bodies, limited to 10mb
    this.app.use(express.json({ limit: "10mb" }));
  }

  // Setup routes by using imported routes
  setupRoutes() {
    // Mount routes for Outfit and WardrobeItem APIs
    this.app.use("/v1/outfits", OutfitRoutes);
    this.app.use("/v1/items", ItemRoutes);
  }

  // Start the server on a specified port
  start(port = 4000) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

// Initialize and start the server
console.log("Starting server...");
const server = new Server();
server.start();
