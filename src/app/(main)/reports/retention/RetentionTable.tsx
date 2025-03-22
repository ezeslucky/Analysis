/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import classNames from 'classnames';
import { ReportContext } from '../[reportId]/Report';
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder';
import { useMessages, useLocale } from '@/components/hooks';
import { formatDate } from '@/lib/date';

const DAYS = [1, 2, 3, 4, 5, 6, 7, 14, 21, 28];

export function RetentionTable({ days = DAYS }) {
  const { formatMessage, labels } = useMessages();
  const { locale } = useLocale();
  const { report } = useContext(ReportContext);
  const { data } = report || {};

  if (!data) {
    return <EmptyPlaceholder />;
  }

  const rows = data.reduce((arr: any[], row: { date: any; visitors: any; day: any }) => {
    const { date, visitors, day } = row;
    if (day === 0) {
      return arr.concat({
        date,
        visitors,
        records: days
          .reduce((arr, day) => {
            arr[day] = data.find(x => x.date === date && x.day === day);
            return arr;
          }, [])
          .filter(n => n),
      });
    }
    return arr;
  }, []);

  const totalDays = rows.length;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-[1px] mb-[1px] font-bold">
          <div className="flex items-center min-w-[160px]">{formatMessage(labels.date)}</div>
          <div className="flex items-center min-w-[80px]">{formatMessage(labels.visitors)}</div>
          {days.map(n => (
            <div key={n} className="flex items-center justify-center w-[60px] h-[60px] text-center text-[var(--font-size-sm)] font-normal">
              {formatMessage(labels.day)} {n}
            </div>
          ))}
        </div>
        {rows.map(({ date, visitors, records }, rowIndex) => {
          return (
            <div key={rowIndex} className="flex flex-row gap-[1px] mb-[1px]">
              <div className="flex items-center min-w-[160px]">{formatDate(date, 'PP', locale)}</div>
              <div className="flex items-center min-w-[80px]">{visitors}</div>
              {days.map(day => {
                if (totalDays - rowIndex < day) {
                  return null;
                }
                const percentage = records.filter(a => a.day === day)[0]?.percentage;
                return (
                  <div
                    key={day}
                    className={classNames("flex items-center justify-center w-[60px] h-[60px] bg-blue200 rounded-[var(--border-radius)]", {
                      "bg-blue100": !percentage,
                    })}
                  >
                    {percentage ? `${Number(percentage).toFixed(2)}%` : ''}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RetentionTable;
