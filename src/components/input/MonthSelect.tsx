import { useRef } from 'react';
import {
  Text,
  Icon,
  CalendarMonthSelect,
  CalendarYearSelect,
  Button,
  PopupTrigger,
  Popup,
} from 'react-basics';
import { startOfMonth, endOfMonth } from 'date-fns';
import Icons from '@/components/icons';
import { useLocale } from '@/components/hooks';
import { formatDate } from '@/lib/date';
import classNames from 'classnames';

export function MonthSelect({ date = new Date(), onChange }) {
  const { locale, dateLocale } = useLocale();
  const month = formatDate(date, 'MMMM', locale);
  const year = date.getFullYear();
  const ref = useRef();

  const handleChange = (close: () => void, date: Date) => {
    onChange(`range:${startOfMonth(date).getTime()}:${endOfMonth(date).getTime()}`);
    close();
  };

  return (
    <div ref={ref} className="flex items-center justify-center border border-gray-400 rounded-md">
      <PopupTrigger>
        <Button className="flex items-center gap-2 cursor-pointer" variant="quiet">
          <Text>{month}</Text>
          <Icon size="sm">
            <Icons.ChevronDown />
          </Icon>
        </Button>
        <Popup className="border border-gray-400 bg-gray-100 rounded-md p-5 mt-1" alignment="start">
          {close => (
            <CalendarMonthSelect
              date={date}
              locale={dateLocale}
              onSelect={handleChange.bind(null, close)}
            />
          )}
        </Popup>
      </PopupTrigger>
      <PopupTrigger>
        <Button className="flex items-center gap-2 cursor-pointer" variant="quiet">
          <Text>{year}</Text>
          <Icon size="sm">
            <Icons.ChevronDown />
          </Icon>
        </Button>
        <Popup className="border border-gray-400 bg-gray-100 rounded-md p-5 mt-1" alignment="start">
          {close => (
            <CalendarYearSelect date={date} onSelect={handleChange.bind(null, close)} />
          )}
        </Popup>
      </PopupTrigger>
    </div>
  );
}

export default MonthSelect;
