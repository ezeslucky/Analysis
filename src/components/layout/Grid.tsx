import { CSSProperties } from 'react';
import classNames from 'classnames';
import { mapChildren } from 'react-basics';

export interface GridProps {
  className?: string;
  style?: CSSProperties;
  children?: any;
}

export function Grid({ className, style, children }: GridProps) {
  return (
    <div className={classNames('grid', className)} style={style}>
      {children}
    </div>
  );
}

export function GridRow(props: {
  [x: string]: any;
  columns?: 'one' | 'two' | 'three' | 'one-two' | 'two-one' | 'compare';
  className?: string;
  children?: any;
}) {
  const { columns = 'two', className, children, ...otherProps } = props;

  const columnClasses = {
    one: 'grid-cols-6',
    two: 'grid-cols-3',
    three: 'grid-cols-2',
    'one-two': 'grid-cols-2 md:grid-cols-4',
    'two-one': 'grid-cols-4 md:grid-cols-2',
    compare: 'grid-cols-[max-content_1fr_1fr]',
  };

  return (
    <div
      {...otherProps}
      className={classNames(
        'grid border-t border-gray-300',
        columnClasses[columns],
        className,
      )}
    >
      {mapChildren(children, (child) => (
        <div className="p-5 min-h-[430px] border-l border-gray-300 first:border-l-0 first:pl-0 last:pr-0">
          {child}
        </div>
      ))}
    </div>
  );
}
