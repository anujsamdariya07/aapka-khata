import { create } from 'zustand';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/lib/axios';
import { showErrorToast, showSuccessToast } from '@/components/ToastComponent';

interface Expense {
  _id: string;
  recipientName: string;
  reason: string;
  amount: number;
  date: string;
  month: string;
  year: string;
}

interface AddExpenseData {
  recipientName: string;
  reason: string;
  amount: number;
  date?: Date;
}

interface UpdateExpenseData {
  recipientName?: string;
  reason?: string;
  amount?: number;
  date?: Date;
}

interface ExpenseResponse {
  success: boolean;
  message?: string;
  error?: string;
  expense?: Expense;
}

interface ExpenseState {
  expenses: Expense[];
  budget: number;
  loading: boolean;
  error: string | null;

  addExpense: (expenseData: AddExpenseData) => Promise<ExpenseResponse>;
  getExpenses: (month?: string, year?: string) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<ExpenseResponse>;
  updateExpense: (
    expenseId: string,
    expenseData: UpdateExpenseData
  ) => Promise<ExpenseResponse>;
  setExpenses: (expenses: Expense[]) => void;
}

interface ApiExpenseSuccessResponse {
  message: string;
  expense: Expense;
}

interface ApiExpensesSuccessResponse {
  message: string;
  expenses: Expense[];
  budget: number;
}

interface ApiErrorResponse {
  message: string;
}

const useExpenseStore = create<ExpenseState>()((set, get) => ({
  expenses: [],
  budget: 0,
  loading: false,
  error: null,

  setExpenses: (expenses: Expense[]) => set({ expenses }),

  addExpense: async (expenseData: AddExpenseData): Promise<ExpenseResponse> => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post<ApiExpenseSuccessResponse>(
        '/expenses/add',
        expenseData
      );

      const newExpense = response.data.expense;

      set((state) => ({
        loading: false,
        expenses: [newExpense, ...state.expenses],
      }));

      showSuccessToast({
        message: response.data.message,
      });

      return {
        success: true,
        message: response.data.message,
        expense: newExpense,
      };
    } catch (error: unknown) {
      const err = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        err.response?.data?.message || 'Failed to add expense.';

      set({
        loading: false,
        error: errorMessage,
      });

      showErrorToast({
        message: 'Error adding expense!',
        description: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  },

  getExpenses: async (month?: string, year?: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (month) params.append('month', month);
      if (year) params.append('year', year);

      const response = await axiosInstance.get<ApiExpensesSuccessResponse>(
        `/expenses${params.toString() ? `?${params.toString()}` : ''}`
      );

      set({
        loading: false,
        expenses: response.data.expenses,
        budget: response.data.budget,
      });
    } catch (error: unknown) {
      const err = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        err.response?.data?.message || 'Failed to fetch expenses.';

      set({
        loading: false,
        error: errorMessage,
        expenses: [],
      });

      console.error('Error fetching expenses:', errorMessage);
    }
  },

  deleteExpense: async (expenseId: string): Promise<ExpenseResponse> => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete<{ message: string }>(
        `/expenses/${expenseId}`
      );

      set((state) => ({
        loading: false,
        expenses: state.expenses.filter((expense) => expense._id !== expenseId),
      }));

      showSuccessToast({
        message: response.data.message,
      });

      return { success: true, message: response.data.message };
    } catch (error: unknown) {
      const err = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        err.response?.data?.message || 'Failed to delete expense.';

      set({
        loading: false,
        error: errorMessage,
      });

      showErrorToast({
        message: 'Error deleting expense!',
        description: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  },

  updateExpense: async (
    expenseId: string,
    expenseData: UpdateExpenseData
  ): Promise<ExpenseResponse> => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put<ApiExpenseSuccessResponse>(
        `/expenses/${expenseId}`,
        expenseData
      );

      const updatedExpense = response.data.expense;

      set((state) => ({
        loading: false,
        expenses: state.expenses.map((expense) =>
          expense._id === expenseId ? updatedExpense : expense
        ),
      }));

      showSuccessToast({
        message: response.data.message,
      });

      return {
        success: true,
        message: response.data.message,
        expense: updatedExpense,
      };
    } catch (error: unknown) {
      const err = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        err.response?.data?.message || 'Failed to update expense.';

      set({
        loading: false,
        error: errorMessage,
      });

      showErrorToast({
        message: 'Error updating expense!',
        description: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  },
}));

export default useExpenseStore;
