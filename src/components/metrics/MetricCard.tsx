import classNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { formatNumber } from '@/lib/format';
import ChangeLabel from '@/components/metrics/ChangeLabel';

export interface MetricCardProps {
  value: number;
  previousValue?: number;
  change?: number;
  label?: string;
  reverseColors?: boolean;
  formatValue?: (n: any) => string;
  showLabel?: boolean;
  showChange?: boolean;
  showPrevious?: boolean;
  className?: string;
}

export const MetricCard = ({
  value = 0,
  change = 0,
  label,
  reverseColors = false,
  formatValue = formatNumber,
  showLabel = true,
  showChange = false,
  showPrevious = false,
  className,
}: MetricCardProps) => {
  const diff = value - change;
  const pct = ((value - diff) / diff) * 100;
  const props = useSpring({ x: Number(value) || 0, from: { x: 0 } });
  const changeProps = useSpring({ x: Number(pct) || 0, from: { x: 0 } });
  const prevProps = useSpring({ x: Number(diff) || 0, from: { x: 0 } });

  return (
    <div
      className={classNames(
        'flex flex-col justify-center min-w-[150px] p-4 border border-gray-300 rounded-lg shadow-sm',
        showPrevious && 'border-none',
        className
      )}
    >
      {showLabel && <div className="font-bold text-gray-700 whitespace-nowrap">{label}</div>}
      <animated.div
        className="text-4xl font-bold whitespace-nowrap text-gray-900 leading-[1.5]"
        title={value?.toString()}
      >
        {props?.x?.to(x => formatValue(x))}
      </animated.div>
      {showChange && (
        <ChangeLabel
          className="text-lg my-2"
          value={change}
          title={formatValue(change)}
          reverseColors={reverseColors}
        >
          <animated.span>{changeProps?.x?.to(x => `${Math.abs(~~x)}%`)}</animated.span>
        </ChangeLabel>
      )}
      {showPrevious && (
        <animated.div
          className="text-4xl font-bold whitespace-nowrap text-gray-700 leading-[1.5]"
          title={diff.toString()}
        >
          {prevProps?.x?.to(x => formatValue(x))}
        </animated.div>
      )}
    </div>
  );
};

export default MetricCard;
