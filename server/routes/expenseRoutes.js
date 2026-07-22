const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

// GET ALL
router.get("/", getExpense);

// GET BY ID
router.get("/:id", getExpenseById);

// POST
router.post("/", createExpense);

// PUT
router.put("/:id", updateExpense);

// DELETE
router.delete("/:id", deleteExpense);

module.exports = router;