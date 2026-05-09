const authservice = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await authservice.register({ name, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authservice.login({ email, password });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

module.exports = { register, login };
