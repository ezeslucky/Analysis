import { Dropdown, Icon, Icons, Item, Text } from 'react-basics';
import LinkButton from '@/components/common/LinkButton';
import { useLocale, useMessages, useNavigation } from '@/components/hooks';
import SideNav from '@/components/layout/SideNav';
import BrowsersTable from '@/components/metrics/BrowsersTable';
import CitiesTable from '@/components/metrics/CitiesTable';
import CountriesTable from '@/components/metrics/CountriesTable';
import DevicesTable from '@/components/metrics/DevicesTable';
import EventsTable from '@/components/metrics/EventsTable';
import HostsTable from '@/components/metrics/HostsTable';
import LanguagesTable from '@/components/metrics/LanguagesTable';
import OSTable from '@/components/metrics/OSTable';
import PagesTable from '@/components/metrics/PagesTable';
import QueryParametersTable from '@/components/metrics/QueryParametersTable';
import ReferrersTable from '@/components/metrics/ReferrersTable';
import RegionsTable from '@/components/metrics/RegionsTable';
import ScreenTable from '@/components/metrics/ScreenTable';
import TagsTable from '@/components/metrics/TagsTable';
import ChannelsTable from '@/components/metrics/ChannelsTable';

const views = {
  url: PagesTable,
  entry: PagesTable,
  exit: PagesTable,
  title: PagesTable,
  referrer: ReferrersTable,
  grouped: ReferrersTable,
  host: HostsTable,
  browser: BrowsersTable,
  os: OSTable,
  device: DevicesTable,
  screen: ScreenTable,
  country: CountriesTable,
  region: RegionsTable,
  city: CitiesTable,
  language: LanguagesTable,
  event: EventsTable,
  query: QueryParametersTable,
  tag: TagsTable,
  channel: ChannelsTable,
};

export default function WebsiteExpandedView({
  websiteId,
  domainName,
}: {
  websiteId: string;
  domainName?: string;
}) {
  const { dir } = useLocale();
  const { formatMessage, labels } = useMessages();
  const {
    router,
    renderUrl,
    query: { view },
  } = useNavigation();

  const items = [
    { key: 'url', label: formatMessage(labels.pages), url: renderUrl({ view: 'url' }) },
    { key: 'referrer', label: formatMessage(labels.referrers), url: renderUrl({ view: 'referrer' }) },
    { key: 'channel', label: formatMessage(labels.channels), url: renderUrl({ view: 'channel' }) },
    { key: 'browser', label: formatMessage(labels.browsers), url: renderUrl({ view: 'browser' }) },
    { key: 'os', label: formatMessage(labels.os), url: renderUrl({ view: 'os' }) },
    { key: 'device', label: formatMessage(labels.devices), url: renderUrl({ view: 'device' }) },
    { key: 'country', label: formatMessage(labels.countries), url: renderUrl({ view: 'country' }) },
    { key: 'region', label: formatMessage(labels.regions), url: renderUrl({ view: 'region' }) },
    { key: 'city', label: formatMessage(labels.cities), url: renderUrl({ view: 'city' }) },
    { key: 'language', label: formatMessage(labels.languages), url: renderUrl({ view: 'language' }) },
    { key: 'screen', label: formatMessage(labels.screens), url: renderUrl({ view: 'screen' }) },
    { key: 'event', label: formatMessage(labels.events), url: renderUrl({ view: 'event' }) },
    { key: 'query', label: formatMessage(labels.queryParameters), url: renderUrl({ view: 'query' }) },
    { key: 'host', label: formatMessage(labels.hosts), url: renderUrl({ view: 'host' }) },
    { key: 'tag', label: formatMessage(labels.tags), url: renderUrl({ view: 'tag' }) },
  ];

  const DetailsComponent = views[view] || (() => null);

  const handleChange = (view: any) => {
    router.push(renderUrl({ view }));
  };

  const renderValue = (value: string) => items.find(({ key }) => key === value)?.label;

  return (
    <div className="grid grid-cols-[300px_1fr] border-t border-base300 md:grid-cols-1">
      <div className="flex flex-col relative pr-5 py-5">
        <LinkButton
          href={renderUrl({ view: undefined })}
          className="inline-flex items-center self-center mb-5 md:self-start md:m-0"
          variant="quiet"
          scroll={false}
        >
          <Icon rotate={dir === 'rtl' ? 0 : 180}>
            <Icons.ArrowRight />
          </Icon>
          <Text>{formatMessage(labels.back)}</Text>
        </LinkButton>
        <SideNav className="hidden md:hidden" items={items} selectedKey={view} shallow={true} />
        <Dropdown
          className="hidden md:flex w-[200px] self-end"
          items={items}
          value={view}
          renderValue={renderValue}
          onChange={handleChange}
          alignment="end"
        >
          {({ key, label }) => <Item key={key}>{label}</Item>}
        </Dropdown>
      </div>
      <div className="min-h-[800px] pl-5 py-5 border-l border-base300 md:border-0">
        <DetailsComponent
          websiteId={websiteId}
          domainName={domainName}
          animate={false}
          virtualize={true}
          itemCount={25}
          allowFilter={true}
          allowSearch={true}
        />
      </div>
    </div>
  );
}
