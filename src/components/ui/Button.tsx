import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ripple?: boolean;
  tooltip?: string;
  pressed?: boolean; // For toggle buttons
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      ripple = true,
      tooltip,
      pressed,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleId = useRef(0);

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(buttonRef.current);
        } else {
          ref.current = buttonRef.current;
        }
      }
    }, [ref]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      // Create ripple effect
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newRipple = {
          id: rippleId.current++,
          x,
          y,
        };
        
        setRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }

      onClick?.(e);
    };

    // Base styles
    const baseStyles = `
      relative inline-flex items-center justify-center font-medium
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      overflow-hidden select-none
    `;

    // Variant styles
    const variantStyles = {
      primary: `
        bg-blue-600 text-white border border-blue-600
        hover:bg-blue-700 hover:border-blue-700 hover:scale-105
        active:bg-blue-800 active:scale-95
        focus:ring-blue-500
        disabled:hover:bg-blue-600 disabled:hover:scale-100
      `,
      secondary: `
        bg-teal-600 text-white border border-teal-600
        hover:bg-teal-700 hover:border-teal-700 hover:scale-105
        active:bg-teal-800 active:scale-95
        focus:ring-teal-500
        disabled:hover:bg-teal-600 disabled:hover:scale-100
      `,
      ghost: `
        bg-transparent text-gray-700 border border-transparent
        hover:bg-gray-100 hover:scale-105
        active:bg-gray-200 active:scale-95
        focus:ring-gray-500
        disabled:hover:bg-transparent disabled:hover:scale-100
      `,
      outline: `
        bg-transparent text-gray-700 border border-gray-300
        hover:bg-gray-50 hover:border-gray-400 hover:scale-105
        active:bg-gray-100 active:scale-95
        focus:ring-gray-500
        disabled:hover:bg-transparent disabled:hover:scale-100
      `,
      destructive: `
        bg-red-600 text-white border border-red-600
        hover:bg-red-700 hover:border-red-700 hover:scale-105
        active:bg-red-800 active:scale-95
        focus:ring-red-500
        disabled:hover:bg-red-600 disabled:hover:scale-100
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-md min-h-[32px]',
      md: 'px-4 py-2 text-sm rounded-lg min-h-[40px]',
      lg: 'px-6 py-3 text-base rounded-lg min-h-[48px]',
      icon: 'p-2 rounded-lg min-h-[40px] min-w-[40px]',
    };

    // Toggle state styles
    const toggleStyles = pressed ? 'ring-2 ring-blue-500 ring-offset-2' : '';

    // Full width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${toggleStyles}
      ${widthStyles}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <button
        ref={buttonRef}
        className={combinedClassName}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-label={props['aria-label'] || (size === 'icon' ? 'Button' : undefined)}
        aria-disabled={disabled || loading}
        aria-pressed={pressed}
        role={pressed !== undefined ? 'button' : undefined}
        title={tooltip}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

        {/* Loading spinner */}
        {loading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}

        {/* Left icon */}
        {leftIcon && !loading && (
          <span className={`${children ? 'mr-2' : ''} flex-shrink-0`}>
            {leftIcon}
          </span>
        )}

        {/* Button content */}
        {children && (
          <span className="flex-1 truncate">
            {children}
          </span>
        )}

        {/* Right icon */}
        {rightIcon && (
          <span className={`${children ? 'ml-2' : ''} flex-shrink-0`}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;