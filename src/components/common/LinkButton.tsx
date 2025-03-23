import { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/hooks';

export interface LinkButtonProps {
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  scroll?: boolean;
  children?: ReactNode;
}

export function LinkButton({
  href,
  className = '',
  variant = 'primary',
  size = 'md',
  scroll = true,
  children,
}: LinkButtonProps) {
  const { dir } = useLocale();

  const baseClasses = `flex items-center self-start whitespace-nowrap font-inherit border border-transparent rounded cursor-pointer relative transition-all`;
  const variantClasses = {
    primary: `text-white bg-primary-400 hover:bg-primary-500 active:bg-primary-600`,
    secondary: `border border-gray-300 bg-gray-50 hover:bg-gray-100 active:bg-gray-200`,
    quiet: `text-gray-900 bg-transparent hover:bg-gray-100 active:bg-gray-200`,
    danger: `text-white bg-red-800 hover:bg-red-900 active:bg-red-1000`,
  };
  const sizeClasses = {
    sm: `text-sm h-[calc(var(--base-height)*0.75)] px-[calc(var(--size600)*0.75)]`,
    md: `text-md h-[var(--base-height)] px-[var(--size600)]`,
    lg: `text-lg h-[calc(var(--base-height)*1.25)] px-[calc(var(--size600)*1.25)]`,
  };

  return (
    <Link
      href={href}
      dir={dir}
      scroll={scroll}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
