import ModelFactory from "../model/ModelFactory.js";

class AuthController {
  constructor() {
    ModelFactory.getModel().then((model) => {
      this.model = model;
    });
  }

  // Google Authentication callback route.
  // This route is called by Google after the user has authenticated.
  // It redirects the user to the home page.
  async googleAuthCallback(req, res) {
    res.redirect("http://127.0.0.1:3000/");
  }
}

export default new AuthController();
