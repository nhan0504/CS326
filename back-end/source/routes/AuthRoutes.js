import express from "express";
import AuthController from "../controller/AuthController.js";
import passport from "../auth/passport.js";
import User from "../model/UserModel.js"

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Google Authentication routes
    this.router.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile"] })
    );

    this.router.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/" }),
        AuthController.googleAuthCallback
    );

    this.router.get("/auth/user", async (req, res) => {
        try {
            if (!req.user) {
                return null;
            }
          const googleId = req.user.googleId; // `req.user` is populated by Passport after authentication

          // Fetch the user from the database
          const user = await User.findOne({ where: { googleId } });
  
          if (!user) {
            return null;
          }
  
          // Return the user data
          res.json({
            googleId: user.googleId,
            username: user.username
          });
        } catch (err) {
          console.error("Error fetching user data:", err);
          res.status(500).json({ error: "Server error" });
        }
      });
    }
  
  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
