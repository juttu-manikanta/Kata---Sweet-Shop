import Sweet from "../models/Sweet.js";

export async function createSweet(data) {
  return await Sweet.create(data);
}

export async function getAllSweets() {
  return await Sweet.find();
}

export async function getSweetById(id) {
  return await Sweet.findById(id);
}

export async function updateSweet(id, data) {
  return await Sweet.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteSweet(id) {
  return await Sweet.findByIdAndDelete(id);
}

export async function purchaseSweet(id) {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  if (sweet.quantity <= 0) throw new Error("Out of stock");

  sweet.quantity -= 1;
  return await sweet.save();
}

export async function restockSweet(id, amount) {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  sweet.quantity += amount;
  return await sweet.save();
}

export async function searchSweets(query) {
  return await Sweet.find({
    name: { $regex: query, $options: "i" }
  });
}
