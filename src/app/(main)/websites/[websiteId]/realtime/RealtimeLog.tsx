import useFormat from '@/components/hooks/useFormat';
import Empty from '@/components/common/Empty';
import FilterButtons from '@/components/common/FilterButtons';
import { useCountryNames, useLocale, useMessages, useTimezone } from '@/components/hooks';
import Icons from '@/components/icons';
import { BROWSERS, OS_NAMES } from '@/lib/constants';
import { stringToColor } from '@/lib/format';
import { RealtimeData } from '@/lib/types';
import { useContext, useMemo, useState } from 'react';
import { Icon, SearchField, StatusLight, Text } from 'react-basics';
import { FixedSizeList } from 'react-window';
import { WebsiteContext } from '../WebsiteProvider';

const TYPE_ALL = 'all';
const TYPE_PAGEVIEW = 'pageview';
const TYPE_SESSION = 'session';
const TYPE_EVENT = 'event';

const icons = {
  [TYPE_PAGEVIEW]: <Icons.Eye />,
  [TYPE_SESSION]: <Icons.Visitor />,
  [TYPE_EVENT]: <Icons.Bolt />,
};

export function RealtimeLog({ data }: { data: RealtimeData }) {
  const website = useContext(WebsiteContext);
  const [search, setSearch] = useState('');
  const { formatMessage, labels, messages } = useMessages();
  const { formatValue } = useFormat();
  const { locale } = useLocale();
  const { formatTimezoneDate } = useTimezone();
  const { countryNames } = useCountryNames(locale);
  const [filter, setFilter] = useState(TYPE_ALL);

  const buttons = [
    { label: formatMessage(labels.all), key: TYPE_ALL },
    { label: formatMessage(labels.views), key: TYPE_PAGEVIEW },
    { label: formatMessage(labels.visitors), key: TYPE_SESSION },
    { label: formatMessage(labels.events), key: TYPE_EVENT },
  ];

  const getTime = ({ createdAt, firstAt }) => formatTimezoneDate(firstAt || createdAt, 'pp');

  const getColor = ({ id, sessionId }) => stringToColor(sessionId || id);

  const getIcon = ({ __type }) => icons[__type];

  const getDetail = (log: {
    __type: string;
    eventName: string;
    urlPath: string;
    browser: string;
    os: string;
    country: string;
    device: string;
  }) => {
    const { __type, eventName, urlPath: url, browser, os, country, device } = log;

    if (__type === TYPE_EVENT) {
      return formatMessage(messages.eventLog, {
        event: <b key="b">{eventName || formatMessage(labels.unknown)}</b>,
        url: (
          <a
            key="a"
            href={`//${website?.domain}${url}`}
            className="text-base900 no-underline hover:text-primary400"
            target="_blank"
            rel="noreferrer noopener"
          >
            {url}
          </a>
        ),
      });
    }

    if (__type === TYPE_PAGEVIEW) {
      return (
        <a
          href={`//${website?.domain}${url}`}
          className="text-base900 no-underline hover:text-primary400"
          target="_blank"
          rel="noreferrer noopener"
        >
          {url}
        </a>
      );
    }

    if (__type === TYPE_SESSION) {
      return formatMessage(messages.visitorLog, {
        country: <b key="country">{countryNames[country] || formatMessage(labels.unknown)}</b>,
        browser: <b key="browser">{BROWSERS[browser]}</b>,
        os: <b key="os">{OS_NAMES[os] || os}</b>,
        device: <b key="device">{formatMessage(labels[device] || labels.unknown)}</b>,
      });
    }
  };

  const Row = ({ index, style }) => {
    const row = logs[index];
    return (
      <div className="flex items-center gap-2.5 h-[50px] border-b border-base300" style={style}>
        <div>
          <StatusLight color={getColor(row)} />
        </div>
        <div className="min-w-[60px] overflow-hidden">{getTime(row)}</div>
        <div className="flex items-center flex-1 gap-2.5 whitespace-nowrap text-ellipsis overflow-hidden">
          <Icon className="me-2.5">{getIcon(row)}</Icon>
          <Text>{getDetail(row)}</Text>
        </div>
      </div>
    );
  };

  const logs = useMemo(() => {
    if (!data) {
      return [];
    }

    let logs = data.events;

    if (search) {
      logs = logs.filter(({ eventName, urlPath, browser, os, country, device }) => {
        return [
          eventName,
          urlPath,
          os,
          formatValue(browser, 'browser'),
          formatValue(country, 'country'),
          formatValue(device, 'device'),
        ]
          .filter(n => n)
          .map(n => n.toLowerCase())
          .join('')
          .includes(search.toLowerCase());
      });
    }

    if (filter !== TYPE_ALL) {
      return logs.filter(({ __type }) => __type === filter);
    }

    return logs;
  }, [data, filter, formatValue, search]);

  return (
    <div className="text-[var(--font-size-sm)] overflow-hidden h-full">
      <div className="flex gap-5 items-center justify-between mb-2.5 md:flex-col">
        <SearchField className="max-w-[300px] md:max-w-full" value={search} onSearch={setSearch} />
        <FilterButtons items={buttons} selectedKey={filter} onSelect={setFilter} />
      </div>
      <div className="flex items-center justify-between text-[var(--font-size-md)] font-bold leading-[40px]">
        {formatMessage(labels.activity)}
      </div>
      <div className="overflow-auto h-full">
        {logs?.length === 0 && <Empty />}
        {logs?.length > 0 && (
          <FixedSizeList width="100%" height={500} itemCount={logs.length} itemSize={50}>
            {Row}
          </FixedSizeList>
        )}
      </div>
    </div>
  );
}

export default RealtimeLog;
