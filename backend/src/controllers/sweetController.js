import {
  createSweet,
  getAllSweets,
  getSweetById,
  updateSweet,
  deleteSweet,
  purchaseSweet as purchaseSrv,
  restockSweet as restockSrv,
  searchSweets
} from "../services/sweetService.js";

export async function addSweet(req, res) {
  try {
    const sweet = await createSweet(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function listSweets(req, res) {
  try {
    const sweets = await getAllSweets();
    res.json(sweets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateSweetById(req, res) {
  try {
    const sweet = await updateSweet(req.params.id, req.body);
    res.json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteSweetById(req, res) {
  try {
    await deleteSweet(req.params.id);
    res.json({ message: "Sweet deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function purchase(req, res) {
  try {
    const sweet = await purchaseSrv(req.params.id);
    res.json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function restock(req, res) {
  try {
    const { amount } = req.body;
    const sweet = await restockSrv(req.params.id, amount);
    res.json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function search(req, res) {
  try {
    const { query } = req.query;
    const result = await searchSweets(query || "");
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
