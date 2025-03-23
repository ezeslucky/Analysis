import classNames from 'classnames';
import { useMessages } from '@/components/hooks';

export interface EmptyProps {
  message?: string;
  className?: string;
}

export function Empty({ message, className }: EmptyProps) {
  const { formatMessage, messages } = useMessages();

  return (
    <div
      className={classNames(
        "text-[var(--base500)] text-[var(--font-size-md)] relative flex items-center justify-center text-center w-full h-full min-h-[70px]",
        className
      )}
    >
      {message || formatMessage(messages.noDataAvailable)}
    </div>
  );
}

export default Empty;
