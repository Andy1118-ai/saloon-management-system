import React, { forwardRef, useState } from 'react';
import Button, { ButtonProps } from './Button';

interface LoadingButtonProps extends ButtonProps {
  loadingText?: string;
  onAsyncClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loadingText, onAsyncClick, onClick, children, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onAsyncClick) {
        setIsLoading(true);
        try {
          await onAsyncClick(e);
        } finally {
          setIsLoading(false);
        }
      } else {
        onClick?.(e);
      }
    };

    return (
      <Button
        ref={ref}
        loading={isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading && loadingText ? loadingText : children}
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;