import { useFormat, useLocale, useMessages, useRegionNames, useTimezone } from '@/components/hooks';
import TypeIcon from '@/components/common/TypeIcon';
import { Icon, CopyIcon } from 'react-basics';
import Icons from '@/components/icons';

export default function SessionInfo({ data }) {
  const { locale } = useLocale();
  const { formatTimezoneDate } = useTimezone();
  const { formatMessage, labels } = useMessages();
  const { formatValue } = useFormat();
  const { getRegionName } = useRegionNames(locale);

  return (
    <div className="grid gap-2.5">
      <dl className="w-full">
        <dt className="text-font-color200 font-bold">ID</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          {data?.id} <CopyIcon value={data?.id} />
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.lastSeen)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          {formatTimezoneDate(data?.lastAt, 'PPPPpp')}
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.firstSeen)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          {formatTimezoneDate(data?.firstAt, 'PPPPpp')}
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.country)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          <TypeIcon type="country" value={data?.country} />
          {formatValue(data?.country, 'country')}
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.region)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          <Icon>
            <Icons.Location />
          </Icon>
          {getRegionName(data?.subdivision1)}
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.city)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          <Icon>
            <Icons.Location />
          </Icon>
          {data?.city}
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.os)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          <TypeIcon type="os" value={data?.os?.toLowerCase()?.replaceAll(/\W/g, '-')} />
          {formatValue(data?.os, 'os')}
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.device)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          <TypeIcon type="device" value={data?.device} />
          {formatValue(data?.device, 'device')}
        </dd>

        <dt className="text-font-color200 font-bold">{formatMessage(labels.browser)}</dt>
        <dd className="flex gap-2.5 items-center my-[5px] mb-7 text-left">
          <TypeIcon type="browser" value={data?.browser} />
          {formatValue(data?.browser, 'browser')}
        </dd>
      </dl>
    </div>
  );
}
