import { FixedSizeList } from 'react-window';
import { useSpring, animated, config } from '@react-spring/web';
import classNames from 'classnames';
import Empty from '@/components/common/Empty';
import { formatLongNumber } from '@/lib/format';
import { useMessages } from '@/components/hooks';
import { ReactNode } from 'react';

const ITEM_SIZE = 30;

export interface ListTableProps {
  data?: any[];
  title?: string;
  metric?: string;
  className?: string;
  renderLabel?: (row: any, index: number) => ReactNode;
  renderChange?: (row: any, index: number) => ReactNode;
  animate?: boolean;
  virtualize?: boolean;
  showPercentage?: boolean;
  itemCount?: number;
}

export function ListTable({
  data = [],
  title,
  metric,
  className,
  renderLabel,
  renderChange,
  animate = true,
  virtualize = false,
  showPercentage = true,
  itemCount = 10,
}: ListTableProps) {
  const { formatMessage, labels } = useMessages();

  const getRow = (row: { x: any; y: any; z: any }, index: number) => {
    const { x: label, y: value, z: percent } = row;

    return (
      <AnimatedRow
        key={label}
        label={renderLabel ? renderLabel(row, index) : label ?? formatMessage(labels.unknown)}
        value={value}
        percent={percent}
        animate={animate && !virtualize}
        showPercentage={showPercentage}
        change={renderChange ? renderChange(row, index) : null}
      />
    );
  };

  const Row = ({ index, style }) => {
    return <div style={style}>{getRow(data[index], index)}</div>;
  };

  return (
    <div className={classNames('relative flex flex-col overflow-hidden', className)}>
      <div className="flex items-center justify-between py-2 border-b">
        <div className="font-semibold">{title}</div>
        <div className="font-semibold text-center w-24">{metric}</div>
      </div>
      <div className="relative overflow-auto">
        {data?.length === 0 && <Empty className="min-h-[200px]" />}
        {virtualize && data.length > 0 ? (
          <FixedSizeList
            width="100%"
            height={itemCount * ITEM_SIZE}
            itemCount={data.length}
            itemSize={ITEM_SIZE}
          >
            {Row}
          </FixedSizeList>
        ) : (
          data.map(getRow)
        )}
      </div>
    </div>
  );
}

const AnimatedRow = ({ label, value = 0, percent, change, animate, showPercentage = true }) => {
  const props = useSpring({
    width: percent,
    y: value,
    from: { width: 0, y: 0 },
    config: animate ? config.default : { duration: 0 },
  });

  return (
    <div className="relative flex items-center justify-between h-8 mb-1 rounded-md hover:bg-gray-200">
      <div className="flex-2 truncate pl-2">{label}</div>
      <div className="flex items-center gap-2 text-right font-semibold mr-2">
        {change}
        <animated.div title={props?.y as any}>{props.y?.to(formatLongNumber)}</animated.div>
      </div>
      {showPercentage && (
        <div className="relative w-12 text-gray-600 border-l border-gray-400 pl-2">
          <animated.div
            className="absolute top-0 left-0 h-8 bg-blue-500 opacity-10"
            style={{ width: props.width.to((n) => `${n}%`) }}
          />
          <animated.span>{props.width.to((n) => `${n?.toFixed?.(0)}%`)}</animated.span>
        </div>
      )}
    </div>
  );
};

export default ListTable;
