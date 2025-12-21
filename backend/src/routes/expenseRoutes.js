import express from 'express';
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from '../controllers/expenseController.js';
import protect from '../middlewares/protectRoute.js';

const router = express.Router();

// All routes are protected
router.post('/add', protect, addExpense);

router.get('/', protect, getExpenses);

router.delete('/:expenseId', protect, deleteExpense);

router.put('/:expenseId', protect, updateExpense);

export default router;
