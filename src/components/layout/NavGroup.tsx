import { useState } from 'react';
import { Icon, Text, TooltipPopup } from 'react-basics';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icons from '@/components/icons';

export interface NavGroupProps {
  title: string;
  items: any[];
  defaultExpanded?: boolean;
  allowExpand?: boolean;
  minimized?: boolean;
}

export function NavGroup({
  title,
  items,
  defaultExpanded = true,
  allowExpand = true,
  minimized = false,
}: NavGroupProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleExpand = () => setExpanded((state) => !state);

  return (
    <div
      className={classNames(
        'flex flex-col w-full',
        { 'block': expanded, 'hidden': !expanded },
        { 'w-[60px]': minimized }
      )}
    >
      {title && (
        <div
          className="flex items-center justify-between text-gray-600 text-[11px] font-semibold uppercase cursor-pointer px-5 py-2"
          onClick={allowExpand ? handleExpand : undefined}
        >
          <Text>{title}</Text>
          <Icon size="sm" rotate={expanded ? 0 : -90}>
            <Icons.ChevronDown />
          </Icon>
        </div>
      )}
      <div className={classNames({ 'hidden': !expanded })}>
        {items.map(({ label, url, icon, divider }) => (
          <TooltipPopup key={label} label={label} position="right" disabled={!minimized}>
            <Link
              href={url}
              className={classNames(
                'relative flex items-center gap-4 font-semibold w-[200px] border-r-2 border-gray-200 px-5 py-4',
                'hover:text-gray-900',
                { 'text-gray-900 bg-blue-100 border-blue-400': pathname.startsWith(url) },
                { 'border-t border-gray-300 before:w-[160px] before:absolute before:top-0 before:left-0 before:right-0 before:m-auto': divider },
                { 'w-[60px] p-5 justify-center': minimized }
              )}
            >
              <Icon>{icon}</Icon>
              {!minimized && <Text>{label}</Text>}
            </Link>
          </TooltipPopup>
        ))}
      </div>
    </div>
  );
}

export default NavGroup;
