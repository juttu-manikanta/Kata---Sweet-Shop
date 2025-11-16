import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export async function registerUser(email, password, role) {
  const exist = await User.findOne({ email });
  if (exist) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role,
  });

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
}
