import { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary as Boundary } from 'react-error-boundary';
import { Button } from 'react-basics';
import { useMessages } from '@/components/hooks';

const logError = (error: Error, info: ErrorInfo) => {
  console.error(error, info.componentStack);
};

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const { formatMessage, messages } = useMessages();

  const fallbackRender = ({ error, resetErrorBoundary }) => {
    return (
      <div
        className="fixed inset-0 m-auto z-[var(--z-index-overlay)] flex flex-col items-center justify-center min-h-[600px] gap-5"
        role="alert"
      >
        <h1>{formatMessage(messages.error)}</h1>
        <h3>{error.message}</h3>
        <pre>{error.stack}</pre>
        <Button onClick={resetErrorBoundary}>OK</Button>
      </div>
    );
  };

  return (
    <Boundary fallbackRender={fallbackRender} onError={logError}>
      {children}
    </Boundary>
  );
}

export default ErrorBoundary;
