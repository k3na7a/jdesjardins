import { Button } from 'react-bootstrap';

import './button.component.scss';

export const ButtonComponent = ({
  variant,
  children,
  size,
  className,
  callback,
}: {
  className?: string;
  variant:
    | 'primary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';
  size?: 'sm' | 'lg';
  callback: () => unknown;
  children: React.ReactNode;
}) => {
  return (
    <Button
      variant={variant}
      className={`${className} custom-button`}
      size={size}
      onClick={callback}
    >
      {children}
    </Button>
  );
};
