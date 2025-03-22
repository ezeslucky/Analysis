import { isSameDay } from 'date-fns';
import { Loading, Icon, StatusLight } from 'react-basics';
import Icons from '@/components/icons';
import { useSessionActivity, useTimezone } from '@/components/hooks';
import { Fragment } from 'react';

export function SessionActivity({
  websiteId,
  sessionId,
  startDate,
  endDate,
}: {
  websiteId: string;
  sessionId: string;
  startDate: Date;
  endDate: Date;
}) {
  const { formatTimezoneDate } = useTimezone();
  const { data, isLoading } = useSessionActivity(websiteId, sessionId, startDate, endDate);

  if (isLoading) {
    return <Loading position="page" />;
  }

  let lastDay = null;

  return (
    <div className="flex flex-col gap-5">
      {data.map(({ eventId, createdAt, urlPath, eventName, visitId }) => {
        const showHeader = !lastDay || !isSameDay(new Date(lastDay), new Date(createdAt));
        lastDay = createdAt;

        return (
          <Fragment key={eventId}>
            {showHeader && (
              <div className="font-bold">{formatTimezoneDate(createdAt, 'PPPP')}</div>
            )}
            <div className="grid grid-cols-[max-content_max-content_1fr] items-center gap-5">
              <div className="text-gray-500 w-36">
                <StatusLight color={`#${visitId?.substring(0, 6)}`}>
                  {formatTimezoneDate(createdAt, 'h:mm:ss aaa')}
                </StatusLight>
              </div>
              <Icon>{eventName ? <Icons.Bolt /> : <Icons.Eye />}</Icon>
              <div>{eventName || urlPath}</div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
