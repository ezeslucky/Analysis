import { format, startOfDay, addHours } from 'date-fns';
import { useLocale, useMessages, useWebsiteSessionsWeekly } from '@/components/hooks';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import { getDayOfWeekAsDate } from '@/lib/date';
import classNames from 'classnames';
import { TooltipPopup } from 'react-basics';

export function SessionsWeekly({ websiteId }: { websiteId: string }) {
  const { data, ...props } = useWebsiteSessionsWeekly(websiteId);
  const { dateLocale } = useLocale();
  const { labels, formatMessage } = useMessages();
  const { weekStartsOn } = dateLocale.options;
  const daysOfWeek = Array(7)
    .fill(weekStartsOn)
    .map((d, i) => (d + i) % 7);

  const [, max] = data
    ? data.reduce((arr: number[], hours: number[], index: number) => {
        const min = Math.min(...hours);
        const max = Math.max(...hours);

        if (index === 0) {
          return [min, max];
        }

        if (min < arr[0]) {
          arr[0] = min;
        }

        if (max > arr[1]) {
          arr[1] = max;
        }

        return arr;
      }, [])
    : [];

  return (
    <LoadingPanel {...(props as any)} data={data}>
      <div key={data} className="flex justify-between relative">
        <div className="flex flex-col items-start justify-start gap-[1px] relative">
          <div className="text-center font-bold mb-2.5">&nbsp;</div>
          {Array(24)
            .fill(null)
            .map((_, i) => {
              const label = format(addHours(startOfDay(new Date()), i), 'p', { locale: dateLocale })
                .replace(/\D00 ?/, '')
                .toLowerCase();
              return (
                <div key={i} className="font-bold text-font-color300 h-5">
                  {label}
                </div>
              );
            })}
        </div>
        {data &&
          daysOfWeek.map((index: number) => {
            const day = data[index];
            return (
              <div key={index} className="flex flex-col items-start justify-start gap-[1px] relative">
                <div className="text-center font-bold mb-2.5">
                  {format(getDayOfWeekAsDate(index), 'EEE', { locale: dateLocale })}
                </div>
                {day?.map((hour: number, j) => {
                  const pct = hour / max;
                  return (
                    <div key={j} className="flex bg-base75 w-5 h-5 m-auto rounded-full items-start">
                      {hour > 0 && (
                        <TooltipPopup
                          label={`${formatMessage(labels.visitors)}: ${hour}`}
                          position="right"
                        >
                          <div
                            className="bg-primary400 w-5 h-5 rounded-full"
                            style={{ opacity: pct, transform: `scale(${pct})` }}
                          />
                        </TooltipPopup>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </LoadingPanel>
  );
}

export default SessionsWeekly;
