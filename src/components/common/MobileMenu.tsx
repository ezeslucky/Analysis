import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function MobileMenu({
  items = [],
  onClose,
}: {
  items: any[];
  className?: string;
  onClose: () => void;
}): any {
  const pathname = usePathname();

  const Items = ({ items, className }: { items: any[]; className?: string }): any => (
    <div className={classNames('flex flex-col', className)}>
      {items.map(({ label, url, children }: { label: string; url: string; children: any[] }) => {
        const selected = pathname.startsWith(url);

        return (
          <>
            <Link
              key={url}
              href={url}
              className={classNames(
                'text-lg font-bold leading-[80px] px-10 text-gray-600',
                { 'text-gray-900': selected }
              )}
              onClick={onClose}
            >
              {label}
            </Link>
            {children && <Items items={children} className="ml-10 text-gray-600" />}
          </>
        );
      })}
    </div>
  );

  return createPortal(
    <div className="fixed top-[60px] left-0 right-0 bottom-0 flex flex-col bg-gray-50 z-[9999] overflow-auto">
      <Items items={items} />
    </div>,
    document.body
  );
}

export default MobileMenu;
