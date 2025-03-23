import classNames from 'classnames';
import { Menu, Item } from 'react-basics';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export interface SideNavProps {
  selectedKey: string;
  items: any[];
  shallow?: boolean;
  scroll?: boolean;
  className?: string;
  onSelect?: () => void;
}

export function SideNav({
  selectedKey,
  items,
  shallow = true,
  scroll = false,
  className,
  onSelect = () => {},
}: SideNavProps) {
  const pathname = usePathname();
  
  return (
    <Menu items={items} selectedKey={selectedKey} className={classNames('flex flex-col gap-1', className)} onSelect={onSelect}>
      {({ key, label, url }) => (
        <Item
          key={key}
          className={classNames(
            'p-0 rounded-md',
            { 'font-bold': pathname.startsWith(url) }
          )}
        >
          <Link href={url} shallow={shallow} scroll={scroll} className="flex-1 px-4 py-2 text-gray-800 hover:bg-gray-200">
            {label}
          </Link>
        </Item>
      )}
    </Menu>
  );
}

export default SideNav;
