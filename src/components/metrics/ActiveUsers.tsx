import { useMemo } from 'react';
import { StatusLight } from 'react-basics';
import { useApi } from '@/components/hooks';
import { useMessages } from '@/components/hooks';

export function ActiveUsers({
  websiteId,
  value,
  refetchInterval = 60000,
}: {
  websiteId: string;
  value?: number;
  refetchInterval?: number;
}) {
  const { formatMessage, messages } = useMessages();
  const { get, useQuery } = useApi();
  const { data } = useQuery({
    queryKey: ['websites:active', websiteId],
    queryFn: () => get(`/websites/${websiteId}/active`),
    enabled: !!websiteId,
    refetchInterval,
  });

  const count = useMemo(() => {
    if (websiteId) {
      return data?.visitors || 0;
    }

    return value !== undefined ? value : 0;
  }, [data, value, websiteId]);

  if (count === 0) {
    return null;
  }

  return (
    <StatusLight className="flex items-center ml-5" variant="success">
      <div className="flex whitespace-nowrap text-base font-normal">
        {formatMessage(messages.activeUsers, { x: count })}
      </div>
    </StatusLight>
  );
}

export default ActiveUsers;
