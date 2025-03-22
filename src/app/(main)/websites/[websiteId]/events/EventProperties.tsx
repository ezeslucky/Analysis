import { GridColumn, GridTable } from 'react-basics';
import { useEventDataProperties, useEventDataValues, useMessages } from '@/components/hooks';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import PieChart from '@/components/charts/PieChart';
import { useState } from 'react';
import { CHART_COLORS } from '@/lib/constants';

export function EventProperties({ websiteId }: { websiteId: string }) {
  const [propertyName, setPropertyName] = useState('');
  const [eventName, setEventName] = useState('');
  const { formatMessage, labels } = useMessages();
  const { data, isLoading, isFetched, error } = useEventDataProperties(websiteId);
  const { data: values } = useEventDataValues(websiteId, eventName, propertyName);
  const chartData =
    propertyName && values
      ? {
          labels: values.map(({ value }) => value),
          datasets: [
            {
              data: values.map(({ total }) => total),
              backgroundColor: CHART_COLORS,
              borderWidth: 0,
            },
          ],
        }
      : null;

  const handleRowClick = row => {
    setEventName(row.eventName);
    setPropertyName(row.propertyName);
  };

  return (
    <LoadingPanel isLoading={isLoading} isFetched={isFetched} data={data} error={error}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-15 mb-10">
        <GridTable data={data} cardMode={false} className="self-start">
          <GridColumn name="eventName" label={formatMessage(labels.name)}>
            {row => (
              <div className="cursor-pointer text-primary400" onClick={() => handleRowClick(row)}>
                {row.eventName}
              </div>
            )}
          </GridColumn>
          <GridColumn name="propertyName" label={formatMessage(labels.property)}>
            {row => (
              <div className="cursor-pointer text-primary400" onClick={() => handleRowClick(row)}>
                {row.propertyName}
              </div>
            )}
          </GridColumn>
          <GridColumn name="total" label={formatMessage(labels.count)} alignment="end" />
        </GridTable>
        {propertyName && (
          <div className="min-h-[620px]">
            <div className="text-center font-bold my-5">{propertyName}</div>
            <PieChart key={propertyName + eventName} type="doughnut" data={chartData} />
          </div>
        )}
      </div>
    </LoadingPanel>
  );
}

export default EventProperties;
