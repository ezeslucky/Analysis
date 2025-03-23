import { useState } from 'react';
import FilterButtons from '@/components/common/FilterButtons';
import { emptyFilter, paramFilter } from '@/lib/filters';
import { FILTER_RAW, FILTER_COMBINED } from '@/lib/constants';
import MetricsTable, { MetricsTableProps } from './MetricsTable';
import { useMessages } from '@/components/hooks';
import classNames from 'classnames';

const filters = {
  [FILTER_RAW]: emptyFilter,
  [FILTER_COMBINED]: [emptyFilter, paramFilter],
};

export function QueryParametersTable({
  allowFilter,
  ...props
}: { allowFilter: boolean } & MetricsTableProps) {
  const [filter, setFilter] = useState(FILTER_COMBINED);
  const { formatMessage, labels } = useMessages();

  const buttons = [
    {
      label: formatMessage(labels.filterCombined),
      key: FILTER_COMBINED,
    },
    { label: formatMessage(labels.filterRaw), key: FILTER_RAW },
  ];

  return (
    <MetricsTable
      {...props}
      title={formatMessage(labels.query)}
      type="query"
      metric={formatMessage(labels.views)}
      dataFilter={filters[filter]}
      renderLabel={({ x, p, v }) =>
        filter === FILTER_RAW ? (
          x
        ) : (
          <div className="inline-flex items-center leading-[26px]">
            <div className="px-2 text-primary-400 bg-blue-100 rounded">{p}</div>
            <div className="px-2">{v}</div>
          </div>
        )
      }
      delay={0}
    >
      {allowFilter && <FilterButtons items={buttons} selectedKey={filter} onSelect={setFilter} />}
    </MetricsTable>
  );
}

export default QueryParametersTable;
