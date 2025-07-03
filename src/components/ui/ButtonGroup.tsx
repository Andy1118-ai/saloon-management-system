import React from 'react';

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md';
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  orientation = 'horizontal',
  spacing = 'sm',
}) => {
  const orientationStyles = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const spacingStyles = {
    none: 'space-x-0 space-y-0',
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
  };

  return (
    <div
      className={`
        inline-flex ${orientationStyles[orientation]} ${spacingStyles[spacing]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="group"
    >
      {children}
    </div>
  );
};

export default ButtonGroup;