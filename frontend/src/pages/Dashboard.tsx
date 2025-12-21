import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, IndianRupee, Receipt, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Expense {
  id: string;
  recipientName: string;
  reason: string;
  amount: number;
  date: Date;
}

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    recipientName: "",
    reason: "",
    amount: "",
  });

  // Mock budget - in real app this would come from user data
  const monthlyBudget = 50000;

  const currentMonthExpenses = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    return expenses.filter((expense) =>
      isWithinInterval(expense.date, { start: monthStart, end: monthEnd })
    );
  }, [expenses, currentDate]);

  const totalSpent = useMemo(() => {
    return currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [currentMonthExpenses]);

  const balance = monthlyBudget - totalSpent;

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const expense: Expense = {
      id: Date.now().toString(),
      recipientName: newExpense.recipientName,
      reason: newExpense.reason,
      amount: parseFloat(newExpense.amount),
      date: new Date(),
    };
    setExpenses((prev) => [...prev, expense]);
    setNewExpense({ recipientName: "", reason: "", amount: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header with Month Selector */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousMonth}
                className="border-border hover:bg-secondary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                {format(currentDate, "MMMM yyyy")}
              </h1>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextMonth}
                className="border-border hover:bg-secondary"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium transition-all">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground font-serif text-xl">Register New Expense</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddExpense} className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName" className="text-foreground">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      placeholder="e.g., Amazon, Zomato"
                      value={newExpense.recipientName}
                      onChange={(e) => setNewExpense((prev) => ({ ...prev, recipientName: e.target.value }))}
                      className="bg-background border-input"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-foreground">Reason for Payment</Label>
                    <Input
                      id="reason"
                      placeholder="e.g., Groceries, Electronics"
                      value={newExpense.reason}
                      onChange={(e) => setNewExpense((prev) => ({ ...prev, reason: e.target.value }))}
                      className="bg-background border-input"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-foreground">Amount</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        placeholder="1000"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))}
                        className="pl-10 bg-background border-input"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Add Expense
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Balance Card */}
          <Card className={`mb-8 shadow-elevated border-border ${balance >= 0 ? 'bg-card' : 'bg-card'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-muted-foreground">Remaining Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <IndianRupee className={`w-8 h-8 ${balance >= 0 ? 'text-success' : 'text-danger'}`} />
                <span className={`text-4xl font-bold font-serif ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                  {Math.abs(balance).toLocaleString("en-IN")}
                </span>
                {balance < 0 && <span className="text-danger text-sm ml-2">(Over budget)</span>}
              </div>
              <div className="mt-4 flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Budget: </span>
                  <span className="text-foreground font-medium">₹{monthlyBudget.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Spent: </span>
                  <span className="text-foreground font-medium">₹{totalSpent.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses List */}
          <Card className="shadow-medium border-border">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-foreground flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentMonthExpenses.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No expenses recorded for this month</p>
                  <p className="text-sm text-muted-foreground mt-1">Click "Add Expense" to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentMonthExpenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{expense.recipientName}</p>
                        <p className="text-sm text-muted-foreground">{expense.reason}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(expense.date, "dd MMM yyyy, hh:mm a")}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-foreground">
                          ₹{expense.amount.toLocaleString("en-IN")}
                        </span>
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
    </div>
  );
};

export default Dashboard;
