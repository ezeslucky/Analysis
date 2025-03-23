import { Icon, Icons, Text } from 'react-basics';
import { useMessages } from '@/components/hooks';

export function ErrorMessage() {
  const { formatMessage, messages } = useMessages();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto flex items-center bg-[var(--base50)] p-2 z-10">
      <Icon className="me-2" size="lg">
        <Icons.Alert />
      </Icon>
      <Text>{formatMessage(messages.error)}</Text>
    </div>
  );
}

export default ErrorMessage;
