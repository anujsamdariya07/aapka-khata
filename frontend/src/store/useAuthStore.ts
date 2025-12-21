import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/lib/axios';
import { showErrorToast, showSuccessToast } from '@/components/ToastComponent';

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  budget: number;
}

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  budget: number;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  loading: boolean;
  error: string | null;

  setAuthUser: (user: AuthUser | null) => void;
  signUp: (signUpData: SignUpData) => Promise<AuthResponse>;
  signIn: (signInData: SignInData) => Promise<AuthResponse>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

interface ApiSuccessResponse {
  message: string;
  user: AuthUser;
}

interface ApiErrorResponse {
  message: string;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authUser: null,
      isCheckingAuth: true,
      loading: false,
      error: null,

      setAuthUser: (user: AuthUser | null) => set({ authUser: user }),

      signUp: async (signUpData: SignUpData): Promise<AuthResponse> => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post<ApiSuccessResponse>(
            '/auth/signup',
            signUpData
          );

          set({
            loading: false,
            authUser: response.data.user,
          });

          showSuccessToast({
            message: response.data.message,
          });

          return { success: true, message: response.data.message };
        } catch (error: unknown) {
          const err = error as AxiosError<ApiErrorResponse>;
          const errorMessage =
            err.response?.data?.message || 'User signup failed.';

          set({
            loading: false,
            error: errorMessage,
          });

          showErrorToast({
            message: 'Error registering new user!',
            description: errorMessage,
          });

          return { success: false, error: errorMessage };
        }
      },

      signIn: async (signInData: SignInData): Promise<AuthResponse> => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post<ApiSuccessResponse>(
            '/auth/signin',
            signInData
          );

          set({
            loading: false,
            authUser: response.data.user,
          });

          showSuccessToast({
            message: response.data.message,
          });

          return { success: true, message: response.data.message };
        } catch (error: unknown) {
          const err = error as AxiosError<ApiErrorResponse>;
          const errorMessage =
            err.response?.data?.message || 'User signin failed.';

          set({
            loading: false,
            error: errorMessage,
          });

          showErrorToast({
            message: 'Error signing in!',
            description: errorMessage,
          });

          return { success: false, error: errorMessage };
        }
      },

      checkAuth: async (): Promise<void> => {
        set({ isCheckingAuth: true, error: null });
        try {
          const response = await axiosInstance.get<ApiSuccessResponse>(
            '/auth/check'
          );

          set({
            authUser: response.data.user,
            isCheckingAuth: false,
          });
        } catch (error: unknown) {
          console.log('Auth check failed:', error);
          set({
            authUser: null,
            isCheckingAuth: false,
          });
        }
      },

      logout: async (): Promise<void> => {
        set({ loading: true, error: null });
        try {
          await axiosInstance.post('/auth/signout');

          set({
            authUser: null,
            loading: false,
          });

          showSuccessToast({
            message: 'Logged out successfully',
          });
        } catch (error: unknown) {
          const err = error as AxiosError<ApiErrorResponse>;
          const errorMessage = err.response?.data?.message || 'Logout failed.';

          set({
            loading: false,
            error: errorMessage,
          });

          showErrorToast({
            message: 'Error logging out!',
            description: errorMessage,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);

export default useAuthStore;
