import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Wallet,
  Mail,
  Lock,
  IndianRupee,
  User,
  Loader,
} from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import { showErrorToast } from '@/components/ToastComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      showErrorToast({
        message: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
      });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      showErrorToast({
        message: 'Invalid Password',
        description: 'Password must be at least 6 characters long.',
      });
      return;
    }

    // Call the signUp function from the store
    const result = await signUp({
      fullName,
      email,
      password,
      budget: monthlyBudget ? Number(monthlyBudget) : undefined,
    });

    // Navigate to dashboard on success
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <Navbar />

      <main className='flex-1 flex items-center justify-center px-4 py-24 gradient-hero'>
        <div className='w-full max-w-md animate-fade-up'>
          <Card className='shadow-elevated border-border'>
            <CardHeader className='text-center pb-2'>
              <div className='mx-auto w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-medium mb-4'>
                <Wallet className='w-8 h-8 text-primary-foreground' />
              </div>
              <CardTitle className='text-2xl font-serif text-foreground'>
                Create Account
              </CardTitle>
              <CardDescription className='text-muted-foreground'>
                Start tracking your expenses today
              </CardDescription>
            </CardHeader>

            <CardContent className='pt-6'>
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div className='space-y-2'>
                  <Label htmlFor='fullName' className='text-foreground'>
                    Full Name
                  </Label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                    <Input
                      id='fullName'
                      type='text'
                      placeholder='John Doe'
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className='pl-10 bg-background border-input focus:ring-ring'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-foreground'>
                    Email
                  </Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                    <Input
                      id='email'
                      type='email'
                      placeholder='you@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='pl-10 bg-background border-input focus:ring-ring'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-foreground'>
                    Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='pl-10 pr-10 bg-background border-input focus:ring-ring'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {showPassword ? (
                        <EyeOff className='w-5 h-5' />
                      ) : (
                        <Eye className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword' className='text-foreground'>
                    Confirm Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                    <Input
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='pl-10 pr-10 bg-background border-input focus:ring-ring'
                      required
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='w-5 h-5' />
                      ) : (
                        <Eye className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='monthlyBudget' className='text-foreground'>
                    Monthly Budget
                  </Label>
                  <div className='relative'>
                    <IndianRupee className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                    <Input
                      id='monthlyBudget'
                      type='number'
                      placeholder='50000'
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(e.target.value)}
                      className='pl-10 bg-background border-input focus:ring-ring'
                      required
                      min='0'
                    />
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium transition-all duration-300'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex items-center justify-center'>
                      Creating Account...
                      <Loader className='w-4 h-4 ml-2 text-primary-foreground animate-spin' />
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className='mt-6 text-center'>
                <p className='text-muted-foreground'>
                  Already have an account?{' '}
                  <Link
                    to='/signin'
                    className='text-primary hover:underline font-medium'
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
