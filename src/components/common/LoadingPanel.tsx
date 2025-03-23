import { ReactNode } from 'react';
import { Loading } from 'react-basics';
import ErrorMessage from '@/components/common/ErrorMessage';
import Empty from '@/components/common/Empty';
import classNames from 'classnames';

export function LoadingPanel({
  data,
  error,
  isFetched,
  isLoading,
  loadingIcon = 'dots',
  className,
  children,
}: {
  data?: any;
  error?: Error;
  isFetched?: boolean;
  isLoading?: boolean;
  loadingIcon?: 'dots' | 'spinner';
  isEmpty?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const isEmpty = !isLoading && isFetched && data && Array.isArray(data) && data.length === 0;

  return (
    <div className={classNames('flex flex-col relative flex-1 h-full', className)}>
      {isLoading && !isFetched && (
        <Loading className="absolute inset-0 m-auto" icon={loadingIcon} />
      )}
      {error && <ErrorMessage />}
      {!error && isEmpty && <Empty />}
      {!error && !isEmpty && data && children}
    </div>
  );
}

export default LoadingPanel;
