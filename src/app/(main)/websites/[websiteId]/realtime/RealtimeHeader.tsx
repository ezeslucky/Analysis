import MetricCard from '@/components/metrics/MetricCard';
import { useMessages } from '@/components/hooks';
import { RealtimeData } from '@/lib/types';

export function RealtimeHeader({ data }: { data: RealtimeData }) {
  const { formatMessage, labels } = useMessages();
  const { totals }: any = data || {};

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex flex-wrap">
        <MetricCard
          className="self-start md:basis-[calc(50%-20px)]"
          label={formatMessage(labels.views)}
          value={totals.views}
        />
        <MetricCard
          className="self-start md:basis-[calc(50%-20px)]"
          label={formatMessage(labels.visitors)}
          value={totals.visitors}
        />
        <MetricCard
          className="self-start md:basis-[calc(50%-20px)]"
          label={formatMessage(labels.events)}
          value={totals.events}
        />
        <MetricCard
          className="self-start md:basis-[calc(50%-20px)]"
          label={formatMessage(labels.countries)}
          value={totals.countries}
        />
      </div>
    </div>
  );
}

export default RealtimeHeader;
