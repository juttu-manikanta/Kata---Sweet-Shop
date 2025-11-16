import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res) {
  try {
    const { email, password, role } = req.body;
    const data = await registerUser(email, password, role);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
