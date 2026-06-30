import express from 'express';
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  updateBudget,
} from '../controllers/expenseController.js';
import protect from '../middlewares/protectRoute.js';

const router = express.Router();

// All routes are protected
router.post('/add', protect, addExpense);

router.get('/', protect, getExpenses);

router.delete('/:expenseId', protect, deleteExpense);

router.put('/:expenseId', protect, updateExpense);

router.put('/budget', protect, updateBudget);

router

export default router;
