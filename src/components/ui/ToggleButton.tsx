import React, { forwardRef, useState } from 'react';
import Button, { ButtonProps } from './Button';

interface ToggleButtonProps extends Omit<ButtonProps, 'pressed'> {
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ defaultPressed = false, onPressedChange, onClick, ...props }, ref) => {
    const [pressed, setPressed] = useState(defaultPressed);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !pressed;
      setPressed(newPressed);
      onPressedChange?.(newPressed);
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        pressed={pressed}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;