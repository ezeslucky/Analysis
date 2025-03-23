import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import SideNav from '@/components/layout/SideNav';

export function MenuLayout({ items = [], children }: { items: any[]; children: ReactNode }) {
  const pathname = usePathname();
  const cloudMode = !!process.env.cloudMode;

  const getKey = () => items.find(({ url }) => pathname === url)?.key;

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-5 md:grid-cols-1">
      {!cloudMode && (
        <div className="w-[240px] pt-[34px] pr-5 md:hidden">
          <SideNav items={items} shallow={true} selectedKey={getKey()} />
        </div>
      )}
      <div className="flex flex-col min-h-[50vh] md:mt-5">{children}</div>
    </div>
  );
}

export default MenuLayout;
