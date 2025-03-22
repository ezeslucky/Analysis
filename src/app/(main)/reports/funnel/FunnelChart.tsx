/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import classNames from 'classnames';
import { useMessages } from '@/components/hooks';
import { ReportContext } from '../[reportId]/Report';
import { formatLongNumber } from '@/lib/format';

export interface FunnelChartProps {
  className?: string;
  isLoading?: boolean;
}

export function FunnelChart({ className }: FunnelChartProps) {
  const { report } = useContext(ReportContext);
  const { formatMessage, labels } = useMessages();

  const { data } = report || {};

  return (
    <div className={classNames("grid", className)}>
      {data?.map(({ type, value, visitors, dropped, dropoff, remaining }, index: number) => {
        return (
          <div key={index} className="grid grid-cols-[max-content_1fr] gap-x-8 relative pb-14">
            {/* Step Number */}
            <div className="flex items-center justify-center rounded-full w-[50px] h-[50px] text-[16px] font-bold text-base800 bg-base100 z-10">
              {index + 1}
            </div>

            {/* Step Card */}
            <div className="grid gap-5 mt-3.5">
              <div className="flex flex-col gap-5">
                <span className="text-base600 font-bold uppercase">
                  {formatMessage(type === 'url' ? labels.viewedPage : labels.triggeredEvent)}
                </span>
                <span className="text-[20px] text-base900 font-bold">{value}</span>
              </div>

              {/* Metric Section */}
              <div className="text-base700 flex justify-between gap-2 my-2.5 lowercase">
                <div>
                  <span className="text-base900 text-[24px] font-extrabold mr-2.5">
                    {formatLongNumber(visitors)}
                  </span>
                  {formatMessage(labels.visitors)}
                </div>
                <div className="text-[20px] font-bold self-end">
                  {(remaining * 100).toFixed(2)}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-base100 rounded-md">
                <div className="flex items-center justify-end bg-base900 h-[30px] rounded-md overflow-hidden relative"
                     style={{ width: `${remaining * 100}%` }}>
                </div>
              </div>

              {/* Drop-off Info */}
              {dropoff > 0 && (
                <div className="lowercase">
                  <b>{formatLongNumber(dropped)}</b> {formatMessage(labels.visitorsDroppedOff)} (
                  {(dropoff * 100).toFixed(2)}%)
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FunnelChart;
