import User from '../models/userModel.js';

const addExpense = async (req, res) => {
  try {
    const { recipientName, reason, amount, date } = req.body;
    const userId = req.user._id;

    if (!recipientName || !reason || !amount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: 'Amount must be greater than 0.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const expenseDate = date ? new Date(date) : new Date();
    const month = expenseDate.toLocaleString('default', { month: 'long' });
    const year = expenseDate.getFullYear().toString();

    const newExpense = {
      recipientName,
      reason,
      amount: parseFloat(amount),
      date: expenseDate,
      month,
      year,
    };

    user.expenses.push(newExpense);
    await user.save();

    return res.status(201).json({
      message: 'Expense added successfully.',
      expense: user.expenses[user.expenses.length - 1],
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month, year } = req.query;

    const user = await User.findById(userId).select('expenses budget');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    let expenses = user.expenses;

    // Filter by month and year if provided
    if (month && year) {
      expenses = expenses.filter(
        (expense) => expense.month === month && expense.year === year
      );
    }

    return res.status(200).json({
      message: 'Expenses retrieved successfully.',
      expenses: expenses.reverse(), // Most recent first
      budget: user.budget,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { expenseId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const expenseIndex = user.expenses.findIndex(
      (expense) => expense._id.toString() === expenseId
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    user.expenses.splice(expenseIndex, 1);
    await user.save();

    return res.status(200).json({
      message: 'Expense deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const updateExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { expenseId } = req.params;
    const { recipientName, reason, amount, date } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const expense = user.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    if (recipientName) expense.recipientName = recipientName;
    if (reason) expense.reason = reason;
    if (amount) {
      if (amount <= 0) {
        return res
          .status(400)
          .json({ message: 'Amount must be greater than 0.' });
      }
      expense.amount = parseFloat(amount);
    }
    if (date) {
      const expenseDate = new Date(date);
      expense.date = expenseDate;
      expense.month = expenseDate.toLocaleString('default', { month: 'long' });
      expense.year = expenseDate.getFullYear().toString();
    }

    await user.save();

    return res.status(200).json({
      message: 'Expense updated successfully.',
      expense,
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

export { addExpense, getExpenses, deleteExpense, updateExpense };
