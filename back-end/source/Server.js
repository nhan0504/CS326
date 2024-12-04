import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./auth/passport.js";
import OutfitRoutes from "./routes/OutfitRoutes.js";
import ItemRoutes from "./routes/ItemRoutes.js";
import StatRoutes from "./routes/StatRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

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

    this.app.use(cors({
      origin: 'http://127.0.0.1:3000', // Frontend origin
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }));
    
    // Configure session management.
    // This is required to persist the login session across requests.
    // The session data is stored in memory by default, but you can also
    // store it in a database or a cache for better scalability.
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );

    // Initialize Passport and restore authentication state, if any, from the
    // session. This allows you to keep a user's authentication state across
    // requests.
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  // Setup routes by using imported routes
  setupRoutes() {
    // Mount routes for Outfit, WardrobeItem, and Google APIs
    this.app.use("/v1/outfits", OutfitRoutes);
    this.app.use("/v1/items", ItemRoutes);
    this.app.use("/v1/stats", StatRoutes);
    this.app.use("/", AuthRoutes);
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
