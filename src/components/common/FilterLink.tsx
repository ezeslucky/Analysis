import classNames from 'classnames';
import { useMessages, useNavigation } from '@/components/hooks';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Icon, Icons } from 'react-basics';

export interface FilterLinkProps {
  id: string;
  value: string;
  label?: string;
  externalUrl?: string;
  className?: string;
  children?: ReactNode;
}

export function FilterLink({
  id,
  value,
  label,
  externalUrl,
  children,
  className,
}: FilterLinkProps) {
  const { formatMessage, labels } = useMessages();
  const { renderUrl, query } = useNavigation();
  const active = query[id] !== undefined;
  const selected = query[id] === value;

  return (
    <div
      className={classNames(
        "flex items-center gap-2",
        active && !selected ? "text-[var(--base500)]" : "",
        active && selected ? "text-[var(--base900)] font-semibold" : "",
        className
      )}
    >
      {children}
      {!value && `(${label || formatMessage(labels.unknown)})`}
      {value && (
        <Link href={renderUrl({ [id]: value })} className="whitespace-nowrap overflow-hidden text-ellipsis">
          {label || value}
        </Link>
      )}
      {externalUrl && (
        <a className="hidden ms-5 group-hover:block" href={externalUrl} target="_blank" rel="noreferrer noopener">
          <Icon className="cursor-pointer">
            <Icons.External />
          </Icon>
        </a>
      )}
    </div>
  );
}

export default FilterLink;
