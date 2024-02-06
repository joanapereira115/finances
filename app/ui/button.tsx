import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-bold text-white focus-visible:outline aria-disabled:cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  );
}
