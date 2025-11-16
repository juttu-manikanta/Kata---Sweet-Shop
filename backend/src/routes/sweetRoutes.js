import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  addSweet,
  listSweets,
  updateSweetById,
  deleteSweetById,
  purchase,
  restock,
  search
} from "../controllers/sweetController.js";

const router = express.Router();

// Public? No. Only logged-in users.
router.get("/", protect, listSweets);

// Search
router.get("/search", protect, search);

// Admin: Create
router.post("/", protect, adminOnly, addSweet);

// Admin: Update
router.put("/:id", protect, adminOnly, updateSweetById);

// Admin: Delete
router.delete("/:id", protect, adminOnly, deleteSweetById);

// Users can purchase
router.post("/:id/purchase", protect, purchase);

// Admin restock
router.post("/:id/restock", protect, adminOnly, restock);

export default router;
