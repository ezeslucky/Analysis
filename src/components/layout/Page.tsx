'use client';

import { ReactNode } from 'react';
import classNames from 'classnames';
import { Banner, Loading } from 'react-basics';
import { useMessages } from '@/components/hooks';

export function Page({
  className,
  error,
  isLoading,
  children,
}: {
  className?: string;
  error?: unknown;
  isLoading?: boolean;
  children?: ReactNode;
}) {
  const { formatMessage, messages } = useMessages();

  if (error) {
    return <Banner variant="error">{formatMessage(messages.error)}</Banner>;
  }

  if (isLoading) {
    return <Loading position="page" />;
  }

  return (
    <div
      className={classNames(
        'flex-1 flex flex-col relative w-full max-w-[1320px] mx-auto px-5 min-h-[calc(100vh-60px)] min-h-[calc(100dvh-60px)]',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Page;
