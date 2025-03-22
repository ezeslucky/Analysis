/* eslint-disable prettier/prettier */
import { ReactNode } from 'react';
import { Icon } from 'react-basics';
import Icons from '@/components/icons';
import Empty from '@/components/common/Empty';
import { useMessages } from '@/components/hooks';
import styles from './ParameterList.module.css';
import classNames from 'classnames';

export interface ParameterListProps {
  children?: ReactNode;
}

export function ParameterList({ children }: ParameterListProps) {
  const { formatMessage, labels } = useMessages();

  return (
    <div className="flex flex-col gap-4">
      {!children && <Empty message={formatMessage(labels.none)} />}
      {children}
    </div>
  );
}

const Item = ({
  children,
  className,
  icon,
  onClick,
  onRemove,
}: {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
}) => {
  return (
    <div className={classNames("flex gap-3 w-full flex-nowrap p-3 border border-base400 rounded-[var(--border-radius)] shadow-[1px_1px_1px_var(--base400)]", className)} onClick={onClick}>
      {icon && <Icon className="h-6">{icon}</Icon>}
      <div className="flex flex-row items-center flex-wrap flex-1">{children}</div>
      <Icon className="h-6" onClick={onRemove}>
        <Icons.Close />
      </Icon>
    </div>
  );
};

ParameterList.Item = Item;

export default ParameterList;
