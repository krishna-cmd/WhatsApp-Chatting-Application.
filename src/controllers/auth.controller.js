const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    console.log("error");
    console.log(err.message);

    res.status(400).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.status(201).json({
      email,
      data,
      Success: "User loggedIn",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};
