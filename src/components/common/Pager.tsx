import classNames from 'classnames';
import { Button, Icon, Icons } from 'react-basics';
import { useMessages } from '@/components/hooks';

export interface PagerProps {
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (nextPage: number) => void;
  className?: string;
}

export function Pager({ page, pageSize, count, onPageChange, className }: PagerProps) {
  const { formatMessage, labels } = useMessages();
  const maxPage = pageSize && count ? Math.ceil(count / pageSize) : 0;
  const lastPage = page === maxPage;
  const firstPage = page === 1;

  if (count === 0 || !maxPage) {
    return null;
  }

  const handlePageChange = (value: number) => {
    const nextPage = page + value;

    if (nextPage > 0 && nextPage <= maxPage) {
      onPageChange(nextPage);
    }
  };

  if (maxPage === 1) {
    return null;
  }

  return (
    <div
      className={classNames(
        'grid grid-cols-3 items-center md:grid-cols-2',
        className
      )}
    >
      <div className="text-gray-600 font-bold">
        {formatMessage(labels.numberOfRecords, { x: count })}
      </div>
      <div className="flex items-center justify-center md:justify-end">
        <Button onClick={() => handlePageChange(-1)} disabled={firstPage}>
          <Icon rotate={90}>
            <Icons.ChevronDown />
          </Icon>
        </Button>
        <div className="text-base mx-4 text-center">
          {formatMessage(labels.pageOf, { current: page, total: maxPage })}
        </div>
        <Button onClick={() => handlePageChange(1)} disabled={lastPage}>
          <Icon rotate={270}>
            <Icons.ChevronDown />
          </Icon>
        </Button>
      </div>
      <div></div>
    </div>
  );
}

export default Pager;
