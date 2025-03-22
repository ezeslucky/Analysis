/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import classNames from 'classnames';
import { useMessages } from '@/components/hooks';
import { ReportContext } from '../[reportId]/Report';
import { formatLongNumber } from '@/lib/format';

export function GoalsChart({ className }: { className?: string; isLoading?: boolean }) {
  const { report } = useContext(ReportContext);
  const { formatMessage, labels } = useMessages();

  const { data } = report || {};

  const getLabel = type => {
    switch (type) {
      case 'url':
        return labels.viewedPage;
      case 'event':
        return labels.triggeredEvent;
      default:
        return labels.collectedData;
    }
  };

  return (
    <div className={classNames("grid gap-7", className)}>
      {data?.map(({ type, value, goal, result, property, operator }, index: number) => {
        const percent = result > goal ? 100 : (result / goal) * 100;

        return (
          <div key={index} className="pb-10 border-b border-base400 last:border-0">
            <div className="grid gap-5 mt-3.5">
              <div className="flex flex-col gap-5">
                <span className="text-base600 font-bold uppercase">{formatMessage(getLabel(type))}</span>
                <span className="text-[20px] text-base900 font-bold">
                  {`${value}${type === 'event-data' ? `:(${operator}):${property}` : ''}`}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="bg-base100 rounded-md">
                <div
                  className={classNames(
                    "flex items-center justify-end h-[10px] rounded-md overflow-hidden relative",
                    {
                      "bg-red-800": percent <= 20,
                      "bg-orange-200": percent > 20 && percent <= 40,
                      "bg-orange-400": percent > 40 && percent <= 60,
                      "bg-orange-600": percent > 60 && percent <= 80,
                      "bg-green-600": percent > 80,
                    }
                  )}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              {/* Metrics */}
              <div className="text-base700 flex justify-between gap-2 my-2.5 lowercase">
                <div className="text-base900 text-[24px] font-extrabold mr-2.5">
                  {formatLongNumber(result)}
                  <span className="text-base700"> / {formatLongNumber(goal)}</span>
                </div>
                <div className="text-[20px] font-bold self-end">{((result / goal) * 100).toFixed(2)}%</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GoalsChart;
