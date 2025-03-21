/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Dropdown, Item, Button, Flexbox } from 'react-basics';
import { useTimezone, useMessages } from '@/components/hooks';
import { getTimezone } from '@/lib/date';
import styles from './TimezoneSetting.module.css';

const timezones = Intl.supportedValuesOf('timeZone');

export function TimezoneSetting() {
  const [search, setSearch] = useState('');
  const { formatMessage, labels } = useMessages();
  const { timezone, saveTimezone } = useTimezone();
  const options = search
    ? timezones.filter(n => n.toLowerCase().includes(search.toLowerCase()))
    : timezones;

  const handleReset = () => saveTimezone(getTimezone());

  return (
    <Flexbox gap={10}>
      <Dropdown
        className="w-[200px]"
        items={options}
        value={timezone}
        onChange={(value: any) => saveTimezone(value)}
        menuProps={{ className:"max-h-[300px] w-[300px]" }}
        allowSearch={true}
        onSearch={setSearch}
      >
        {item => <Item key={item}>{item}</Item>}
      </Dropdown>
      <Button onClick={handleReset}>{formatMessage(labels.reset)}</Button>
    </Flexbox>
  );
}

export default TimezoneSetting;
