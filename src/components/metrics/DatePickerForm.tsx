import { useState } from 'react';
import { Button, ButtonGroup, Calendar } from 'react-basics';
import { isAfter, isBefore, isSameDay, startOfDay, endOfDay } from 'date-fns';
import { useLocale } from '@/components/hooks';
import { FILTER_DAY, FILTER_RANGE } from '@/lib/constants';
import { useMessages } from '@/components/hooks';

export function DatePickerForm({
  startDate: defaultStartDate,
  endDate: defaultEndDate,
  minDate,
  maxDate,
  onChange,
  onClose,
}) {
  const [selected, setSelected] = useState(
    isSameDay(defaultStartDate, defaultEndDate) ? FILTER_DAY : FILTER_RANGE,
  );
  const [singleDate, setSingleDate] = useState(defaultStartDate);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const { dateLocale } = useLocale();
  const { formatMessage, labels } = useMessages();

  const disabled =
    selected === FILTER_DAY
      ? isAfter(minDate, singleDate) && isBefore(maxDate, singleDate)
      : isAfter(startDate, endDate);

  const handleSave = () => {
    if (selected === FILTER_DAY) {
      onChange(`range:${startOfDay(singleDate).getTime()}:${endOfDay(singleDate).getTime()}`);
    } else {
      onChange(`range:${startOfDay(startDate).getTime()}:${endOfDay(endDate).getTime()}`);
    }
  };

  return (
    <div className="flex flex-col max-w-full">
      <div className="flex justify-center items-center mb-5">
        <ButtonGroup selectedKey={selected} onSelect={key => setSelected(key as any)}>
          <Button key={FILTER_DAY}>{formatMessage(labels.singleDay)}</Button>
          <Button key={FILTER_RANGE}>{formatMessage(labels.dateRange)}</Button>
        </ButtonGroup>
      </div>
      <div className="flex justify-center flex-wrap">
        {selected === FILTER_DAY && (
          <Calendar
            date={singleDate}
            minDate={minDate}
            maxDate={maxDate}
            locale={dateLocale}
            onChange={setSingleDate}
          />
        )}
        {selected === FILTER_RANGE && (
          <>
            <div className="flex gap-5 border-l border-gray-300 pl-5">
              <Calendar
                date={startDate}
                minDate={minDate}
                maxDate={endDate}
                locale={dateLocale}
                onChange={setStartDate}
              />
              <Calendar
                date={endDate}
                minDate={startDate}
                maxDate={maxDate}
                locale={dateLocale}
                onChange={setEndDate}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center items-center gap-3 mt-5">
        <Button variant="primary" onClick={handleSave} disabled={disabled}>
          {formatMessage(labels.save)}
        </Button>
        <Button onClick={onClose}>{formatMessage(labels.cancel)}</Button>
      </div>
    </div>
  );
}

export default DatePickerForm;
