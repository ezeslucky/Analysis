import { Dropdown, Item } from 'react-basics';
import classNames from 'classnames';
import { useDateRange, useMessages, useSticky } from '@/components/hooks';
import WebsiteDateFilter from '@/components/input/WebsiteDateFilter';
import MetricCard from '@/components/metrics/MetricCard';
import MetricsBar from '@/components/metrics/MetricsBar';
import { formatShortTime, formatLongNumber } from '@/lib/format';
import useWebsiteStats from '@/components/hooks/queries/useWebsiteStats';
import useStore, { setWebsiteDateCompare } from '@/store/websites';
import WebsiteFilterButton from './WebsiteFilterButton';

export function WebsiteMetricsBar({
  websiteId,
  sticky,
  showChange = false,
  compareMode = false,
  showFilter = false,
}: {
  websiteId: string;
  sticky?: boolean;
  showChange?: boolean;
  compareMode?: boolean;
  showFilter?: boolean;
}) {
  const { dateRange } = useDateRange(websiteId);
  const { formatMessage, labels } = useMessages();
  const dateCompare = useStore(state => state[websiteId]?.dateCompare);
  const { ref, isSticky } = useSticky({ enabled: sticky });
  const { data, isLoading, isFetched, error } = useWebsiteStats(
    websiteId,
    compareMode && dateCompare,
  );
  const isAllTime = dateRange.value === 'all';

  const { pageviews, visitors, visits, bounces, totaltime } = data || {};

  const metrics = data
    ? [
        {
          ...pageviews,
          label: formatMessage(labels.views),
          change: pageviews.value - pageviews.prev,
          formatValue: formatLongNumber,
        },
        {
          ...visits,
          label: formatMessage(labels.visits),
          change: visits.value - visits.prev,
          formatValue: formatLongNumber,
        },
        {
          ...visitors,
          label: formatMessage(labels.visitors),
          change: visitors.value - visitors.prev,
          formatValue: formatLongNumber,
        },
        {
          label: formatMessage(labels.bounceRate),
          value: (Math.min(visits.value, bounces.value) / visits.value) * 100,
          prev: (Math.min(visits.prev, bounces.prev) / visits.prev) * 100,
          change:
            (Math.min(visits.value, bounces.value) / visits.value) * 100 -
            (Math.min(visits.prev, bounces.prev) / visits.prev) * 100,
          formatValue: n => Math.round(+n) + '%',
          reverseColors: true,
        },
        {
          label: formatMessage(labels.visitDuration),
          value: totaltime.value / visits.value,
          prev: totaltime.prev / visits.prev,
          change: totaltime.value / visits.value - totaltime.prev / visits.prev,
          formatValue: n =>
            `${+n < 0 ? '-' : ''}${formatShortTime(Math.abs(~~n), ['m', 's'], ' ')}`,
        },
      ]
    : [];

  const items = [
    { label: formatMessage(labels.previousPeriod), value: 'prev' },
    { label: formatMessage(labels.previousYear), value: 'yoy' },
  ];

  return (
    <div
      ref={ref}
      className={classNames(
        'grid grid-cols-[2fr_1fr] justify-between items-center bg-base50 z-[var(--z-index-above)] min-h-[120px] pb-5 lg:grid-cols-1 lg:py-5',
        { 'sticky top-[-1px]': sticky, 'py-2.5 border-b border-base300': sticky && isSticky },
      )}
    >
      <div>
        <MetricsBar isLoading={isLoading} isFetched={isFetched} error={error}>
          {metrics.map(({ label, value, prev, change, formatValue, reverseColors }) => (
            <MetricCard
              key={label}
              value={value}
              previousValue={prev}
              label={label}
              change={change}
              formatValue={formatValue}
              reverseColors={reverseColors}
              showChange={!isAllTime && (compareMode || showChange)}
              showPrevious={!isAllTime && compareMode}
            />
          ))}
        </MetricsBar>
      </div>
      <div className="flex flex-col items-end gap-2.5 flex-wrap lg:my-5">
        {showFilter && <WebsiteFilterButton websiteId={websiteId} />}
        <WebsiteDateFilter websiteId={websiteId} showAllTime={!compareMode} />
        {compareMode && (
          <div className="flex items-center justify-end w-full gap-2.5">
            <b>VS</b>
            <Dropdown
              className="min-w-[200px]"
              items={items}
              value={dateCompare || 'prev'}
              renderValue={value => items.find(i => i.value === value)?.label}
              alignment="end"
              onChange={(value: any) => setWebsiteDateCompare(websiteId, value)}
            >
              {items.map(({ label, value }) => (
                <Item key={value}>{label}</Item>
              ))}
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default WebsiteMetricsBar;
