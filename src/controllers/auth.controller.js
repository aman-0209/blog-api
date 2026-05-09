const authservice = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password, ...rest } = req.body;

    if (Object.keys(rest).length > 0) {
      return res
        .status(400)
        .json({ error: "Only name, email and password are allowed" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required    " });
    }

    const user = await authservice.register({ name, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    if (Object.keys(rest).length > 0) {
      return res
        .status(400)
        .json({ error: "Only email and password are allowed" });
    }
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required    " });
    }

    const result = await authservice.login({ email, password });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

module.exports = { register, login };
