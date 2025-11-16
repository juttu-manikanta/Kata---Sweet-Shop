import api from "./api";

// Get all sweets
export function getSweets() {
  return api.get("/sweets").then((res) => res.data);
}

// Search by name
export function searchSweets(query) {
  return api
    .get(`/sweets/search?query=${encodeURIComponent(query)}`)
    .then((res) => res.data);
}

// Admin: create new sweet
export function createSweet(data) {
  return api.post("/sweets", data).then((res) => res.data);
}

// Admin: update sweet
export function updateSweet(id, data) {
  return api.put(`/sweets/${id}`, data).then((res) => res.data);
}

// Admin: delete sweet
export function deleteSweet(id) {
  return api.delete(`/sweets/${id}`).then((res) => res.data);
}

// Purchase (any logged-in user)
export function purchaseSweet(id) {
  return api.post(`/sweets/${id}/purchase`).then((res) => res.data);
}

// Restock (admin only)
export function restockSweet(id, amount) {
  return api.post(`/sweets/${id}/restock`, { amount }).then((res) => res.data);
}
