import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Wallet, Mail, Lock, Loader } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
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

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, loading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn({ email, password });

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
                Welcome Back
              </CardTitle>
              <CardDescription className='text-muted-foreground'>
                Sign in to manage your expenses
              </CardDescription>
            </CardHeader>

            <CardContent className='pt-6'>
              <form onSubmit={handleSubmit} className='space-y-5'>
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

                <Button
                  type='submit'
                  className='w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium transition-all duration-300'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex items-center justify-center'>
                      Signing In...
                      <Loader className='w-4 h-4 ml-2 text-primary-foreground animate-spin' />
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className='mt-6 text-center'>
                <p className='text-muted-foreground'>
                  Don't have an account?{' '}
                  <Link
                    to='/signup'
                    className='text-primary hover:underline font-medium'
                  >
                    Sign Up
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

export default SignIn;
