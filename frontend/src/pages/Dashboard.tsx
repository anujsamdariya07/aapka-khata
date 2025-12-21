import { useState, useMemo, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  IndianRupee,
  Receipt,
  Calendar,
  Loader,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import useExpenseStore from '@/store/useExpenseStore';
import useAuthStore from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { expenses, budget, loading, addExpense, getExpenses, deleteExpense } =
    useExpenseStore();
  const { authUser } = useAuthStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [newExpense, setNewExpense] = useState({
    recipientName: '',
    reason: '',
    amount: '',
  });

  // Fetch expenses on mount and when month changes
  useEffect(() => {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear().toString();
    getExpenses(month, year);
  }, [currentDate, getExpenses]);

  useEffect(() => console.log(authUser), [authUser]);

  // Use budget from auth user or expense store
  const monthlyBudget = authUser?.budget || budget || 0;

  const currentMonthExpenses = useMemo(() => {
    return expenses.map((expense) => ({
      ...expense,
      date: new Date(expense.date),
    }));
  }, [expenses]);

  const totalSpent = useMemo(() => {
    return currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }, [currentMonthExpenses]);

  const balance = monthlyBudget - totalSpent;

  const handlePreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await addExpense({
      recipientName: newExpense.recipientName,
      reason: newExpense.reason,
      amount: parseFloat(newExpense.amount),
      date: new Date(),
    });

    if (result.success) {
      setNewExpense({ recipientName: '', reason: '', amount: '' });
      setIsModalOpen(false);
    }
  };

  const handleOpenDeleteModal = (expenseId: string) => {
    setExpenseToDelete(expenseId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
    setDeleteLoading(false);
  };

  const handleDeleteExpense = async () => {
    if (!expenseToDelete) return;

    setDeleteLoading(true);
    await deleteExpense(expenseToDelete);
    setDeleteLoading(false);
    handleCloseDeleteModal();
  };

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <Navbar />

      <main className='flex-1 pt-20 md:pt-24 pb-8 md:pb-12 px-3 sm:px-4 md:px-6'>
        <div className='container mx-auto max-w-4xl px-2 sm:px-4'>
          {/* Header with Month Selector */}
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8'>
            <div className='flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start'>
              <Button
                variant='outline'
                size='icon'
                onClick={handlePreviousMonth}
                className='border-border hover:bg-secondary h-9 w-9 sm:h-10 sm:w-10'
              >
                <ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
              </Button>
              <h1 className='text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground text-center sm:text-left px-2'>
                {format(currentDate, 'MMMM yyyy')}
              </h1>
              <Button
                variant='outline'
                size='icon'
                onClick={handleNextMonth}
                className='border-border hover:bg-secondary h-9 w-9 sm:h-10 sm:w-10'
              >
                <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5' />
              </Button>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className='bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium transition-all w-full sm:w-auto mt-2 sm:mt-0 py-2 h-auto'>
                  <Plus className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2' />
                  <span className='text-sm sm:text-base'>Add Expense</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-card border-border max-w-[95vw] sm:max-w-md md:max-w-lg mx-2 sm:mx-0'>
                <DialogHeader>
                  <DialogTitle className='text-foreground font-serif text-lg sm:text-xl'>
                    Register New Expense
                  </DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleAddExpense}
                  className='space-y-4 pt-2 sm:pt-4'
                >
                  <div className='space-y-1.5 sm:space-y-2'>
                    <Label
                      htmlFor='recipientName'
                      className='text-foreground text-sm sm:text-base'
                    >
                      Recipient Name
                    </Label>
                    <Input
                      id='recipientName'
                      placeholder='e.g., Amazon, Zomato'
                      value={newExpense.recipientName}
                      onChange={(e) =>
                        setNewExpense((prev) => ({
                          ...prev,
                          recipientName: e.target.value,
                        }))
                      }
                      className='bg-background border-input text-sm sm:text-base py-2 sm:py-2.5'
                      required
                    />
                  </div>
                  <div className='space-y-1.5 sm:space-y-2'>
                    <Label
                      htmlFor='reason'
                      className='text-foreground text-sm sm:text-base'
                    >
                      Reason for Payment
                    </Label>
                    <Input
                      id='reason'
                      placeholder='e.g., Groceries, Electronics'
                      value={newExpense.reason}
                      onChange={(e) =>
                        setNewExpense((prev) => ({
                          ...prev,
                          reason: e.target.value,
                        }))
                      }
                      className='bg-background border-input text-sm sm:text-base py-2 sm:py-2.5'
                      required
                    />
                  </div>
                  <div className='space-y-1.5 sm:space-y-2'>
                    <Label
                      htmlFor='amount'
                      className='text-foreground text-sm sm:text-base'
                    >
                      Amount
                    </Label>
                    <div className='relative'>
                      <IndianRupee className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground' />
                      <Input
                        id='amount'
                        type='number'
                        placeholder='1000'
                        value={newExpense.amount}
                        onChange={(e) =>
                          setNewExpense((prev) => ({
                            ...prev,
                            amount: e.target.value,
                          }))
                        }
                        className='pl-8 sm:pl-10 bg-background border-input text-sm sm:text-base py-2 sm:py-2.5'
                        required
                        min='0'
                        step='0.01'
                      />
                    </div>
                  </div>
                  <Button
                    type='submit'
                    className='w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 sm:py-3 text-sm sm:text-base'
                    disabled={loading}
                  >
                    {loading ? (
                      <div className='flex items-center justify-center'>
                        Adding...
                        <Loader className='w-4 h-4 ml-2 text-primary-foreground animate-spin' />
                      </div>
                    ) : (
                      'Add Expense'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Balance Card */}
          <Card
            className={`mb-6 sm:mb-8 shadow-elevated border-border ${
              balance >= 0 ? 'bg-card' : 'bg-card'
            }`}
          >
            <CardHeader className='pb-1.5 sm:pb-2 px-4 sm:px-6'>
              <CardTitle className='text-sm sm:text-lg font-medium text-muted-foreground'>
                Remaining Balance
              </CardTitle>
            </CardHeader>
            <CardContent className='px-4 sm:px-6'>
              <div className='flex items-center gap-2'>
                <IndianRupee
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    balance >= 0 ? 'text-success' : 'text-danger'
                  }`}
                />
                <span
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold font-serif ${
                    balance >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {Math.abs(balance).toLocaleString('en-IN')}
                </span>
                {balance < 0 && (
                  <span className='text-danger text-xs sm:text-sm ml-1 sm:ml-2'>
                    (Over budget)
                  </span>
                )}
              </div>
              <div className='mt-3 sm:mt-4 flex flex-col sm:flex-row sm:gap-6 gap-2 text-xs sm:text-sm'>
                <div className='flex justify-between sm:block'>
                  <span className='text-muted-foreground'>Budget: </span>
                  <span className='text-foreground font-medium ml-1 sm:ml-0'>
                    ₹{monthlyBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className='flex justify-between sm:block'>
                  <span className='text-muted-foreground'>Spent: </span>
                  <span className='text-foreground font-medium ml-1 sm:ml-0'>
                    ₹{totalSpent.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses List */}
          <Card className='shadow-medium border-border'>
            <CardHeader className='px-4 sm:px-6'>
              <CardTitle className='text-lg sm:text-xl font-serif text-foreground flex items-center gap-2'>
                <Receipt className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                <span className='text-base sm:text-xl'>Expenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='px-3 sm:px-6'>
              {loading && currentMonthExpenses.length === 0 ? (
                <div className='text-center py-8 sm:py-12'>
                  <p className='flex text-muted-foreground text-sm sm:text-base justify-center items-center'>
                    Loading expenses...
                    <Loader className='w-5 h-5 ml-2 inline-block text-muted-foreground animate-spin' />
                  </p>
                </div>
              ) : currentMonthExpenses.length === 0 ? (
                <div className='text-center py-8 sm:py-12'>
                  <Calendar className='w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4' />
                  <p className='text-muted-foreground text-sm sm:text-base'>
                    No expenses recorded for this month
                  </p>
                  <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
                    Click "Add Expense" to get started
                  </p>
                </div>
              ) : (
                <div className='space-y-2 sm:space-y-3'>
                  {currentMonthExpenses.map((expense) => (
                    <div
                      key={expense._id}
                      className='flex items-center justify-between p-3 sm:p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors'
                    >
                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-foreground text-sm sm:text-base truncate'>
                          {expense.recipientName}
                        </p>
                        <p className='text-xs sm:text-sm text-muted-foreground truncate'>
                          {expense.reason}
                        </p>
                        <p className='text-xs text-muted-foreground mt-0.5 sm:mt-1'>
                          {format(expense.date, 'dd MMM yyyy, hh:mm a')}
                        </p>
                      </div>
                      <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2 sm:ml-4'>
                        <div className='text-right'>
                          <span className='text-base sm:text-lg font-semibold text-foreground whitespace-nowrap'>
                            ₹{expense.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleOpenDeleteModal(expense._id)}
                          className='text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 sm:h-9 sm:w-9'
                          disabled={loading}
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className='bg-card border-border max-w-[95vw] sm:max-w-md mx-2 sm:mx-0'>
          <DialogHeader>
            <div className='flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-4'>
              <AlertTriangle className='w-6 h-6 text-destructive' />
            </div>
            <DialogTitle className='text-center text-foreground font-serif text-xl'>
              Delete Expense
            </DialogTitle>
            <DialogDescription className='text-center text-muted-foreground'>
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={handleCloseDeleteModal}
              className='w-full sm:w-auto border-border hover:bg-secondary'
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              type='button'
              variant='destructive'
              onClick={handleDeleteExpense}
              className='w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90'
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <div className='flex items-center justify-center'>
                  Deleting...
                  <Loader className='w-4 h-4 ml-2 text-destructive-foreground animate-spin' />
                </div>
              ) : (
                'Delete Expense'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
