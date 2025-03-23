import classNames from 'classnames';
import { Icon, Icons } from 'react-basics';
import { ReactNode } from 'react';

export function ChangeLabel({
  value,
  size,
  title,
  reverseColors,
  className,
  children,
}: {
  value: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  title?: string;
  reverseColors?: boolean;
  showPercentage?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const positive = value >= 0;
  const negative = value < 0;
  const neutral = value === 0 || isNaN(value);
  const good = reverseColors ? negative : positive;

  return (
    <div
      className={classNames(
        'flex items-center gap-1 text-[13px] font-bold px-2 py-[2px] rounded text-gray-500 self-start',
        {
          'text-green-700 bg-green-100': good,
          'text-red-700 bg-red-100': !good,
          'text-gray-700 bg-gray-100': neutral,
        },
        className,
      )}
      title={title}
    >
      {!neutral && (
        <Icon rotate={positive ? -90 : 90} size={size}>
          <Icons.ArrowRight />
        </Icon>
      )}
      {children || value}
    </div>
  );
}

export default ChangeLabel;
