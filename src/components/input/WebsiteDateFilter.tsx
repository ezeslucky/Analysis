import { useDateRange, useLocale } from '@/components/hooks';
import { isAfter } from 'date-fns';
import { getOffsetDateRange } from '@/lib/date';
import { Button, Icon, Icons } from 'react-basics';
import DateFilter from './DateFilter';
import classNames from 'classnames';
import { DateRange } from '@/lib/types';

export function WebsiteDateFilter({
  websiteId,
  showAllTime = true,
}: {
  websiteId: string;
  showAllTime?: boolean;
}) {
  const { dir } = useLocale();
  const { dateRange, saveDateRange } = useDateRange(websiteId);
  const { value, startDate, endDate, offset } = dateRange;
  const disableForward =
    value === 'all' || isAfter(getOffsetDateRange(dateRange, 1).startDate, new Date());

  const handleChange = (value: string | DateRange) => {
    saveDateRange(value);
  };

  const handleIncrement = (increment: number) => {
    saveDateRange(getOffsetDateRange(dateRange, increment));
  };

  return (
    <div className="flex items-center gap-2">
      <DateFilter
        className="min-w-[200px]"
        value={value}
        startDate={startDate}
        endDate={endDate}
        offset={offset}
        onChange={handleChange}
        showAllTime={showAllTime}
      />
      {value !== 'all' && !value.startsWith('range') && (
        <div className="flex">
          <Button
            onClick={() => handleIncrement(-1)}
            className="rounded-r-none border-r border-base400"
          >
            <Icon rotate={dir === 'rtl' ? 270 : 90}>
              <Icons.ChevronDown />
            </Icon>
          </Button>
          <Button
            onClick={() => handleIncrement(1)}
            disabled={disableForward}
            className="rounded-l-none"
          >
            <Icon rotate={dir === 'rtl' ? 90 : 270}>
              <Icons.ChevronDown />
            </Icon>
          </Button>
        </div>
      )}
    </div>
  );
}

export default WebsiteDateFilter;
