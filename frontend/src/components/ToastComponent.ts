import { toast } from 'sonner';

export const showSuccessToast = ({ message }: { message: string }) => {
  toast.success(message, {
    style: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      border: 'none',
      borderRadius: 'calc(var(--radius) - 2px)',
      padding: '1rem',
      fontFamily: 'var(--font-sans)',
      fontWeight: '500',
      fontSize: '0.875rem',
      boxShadow: 'var(--shadow-elevated)',
      backdropFilter: 'blur(8px)',
      borderLeft: '4px solid var(--success)',
      animation: 'scale-in 0.3s ease-out',
    },
    className: 'animate-scale-in',
    duration: 3000,
  });
};

export const showErrorToast = ({
  message,
  description,
}: {
  message: string;
  description: string;
}) => {
  toast.error(message, {
    style: {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
      border: 'none',
      borderRadius: 'calc(var(--radius) - 2px)',
      padding: '1rem',
      fontFamily: 'var(--font-sans)',
      fontWeight: '500',
      fontSize: '0.875rem',
      boxShadow: 'var(--shadow-elevated)',
      backdropFilter: 'blur(8px)',
      borderLeft: '4px solid hsl(var(--destructive))',
      animation: 'scale-in 0.3s ease-out',
    },
    description: description,
    className: 'animate-scale-in',
    duration: 4000,
  });
};

export const showInfoToast = ({ message }: { message: string }) => {
  toast.info(message, {
    style: {
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
      borderRadius: 'calc(var(--radius) - 2px)',
      padding: '1rem',
      fontFamily: 'var(--font-sans)',
      fontWeight: '500',
      fontSize: '0.875rem',
      boxShadow: 'var(--shadow-elevated)',
      backdropFilter: 'blur(8px)',
      borderLeft: '4px solid hsl(var(--primary))',
    },
    className: 'animate-scale-in',
    duration: 3000,
  });
};

export const showWarningToast = ({
  message,
  description,
}: {
  message: string;
  description?: string;
}) => {
  toast.warning(message, {
    style: {
      backgroundColor: 'oklch(0.95 0.1 70)',
      color: 'oklch(0.3 0.1 70)',
      border: 'none',
      borderRadius: 'calc(var(--radius) - 2px)',
      padding: '1rem',
      fontFamily: 'var(--font-sans)',
      fontWeight: '500',
      fontSize: '0.875rem',
      boxShadow: 'var(--shadow-elevated)',
      backdropFilter: 'blur(8px)',
      borderLeft: '4px solid oklch(0.7 0.2 70)',
    },
    description: description,
    className: 'animate-scale-in',
    duration: 4000,
  });
};

// Enhanced toast with gradient styling
export const showGradientSuccessToast = ({ message }: { message: string }) => {
  toast.success(message, {
    style: {
      background: 'var(--gradient-primary)',
      color: 'white',
      border: 'none',
      borderRadius: 'calc(var(--radius) - 2px)',
      padding: '1.25rem 1rem',
      fontFamily: 'var(--font-sans)',
      fontWeight: '600',
      fontSize: '0.875rem',
      boxShadow: 'var(--shadow-glow)',
    },
    className: 'animate-scale-in',
    duration: 3000,
  });
};
