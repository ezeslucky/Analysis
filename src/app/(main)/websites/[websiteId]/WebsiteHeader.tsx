import classNames from 'classnames';
import Favicon from '@/components/common/Favicon';
import { useMessages, useTeamUrl, useWebsite } from '@/components/hooks';
import Icons from '@/components/icons';
import ActiveUsers from '@/components/metrics/ActiveUsers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Button, Icon, Text } from 'react-basics';
import Lightning from '@/assets/lightning.svg';

export function WebsiteHeader({
  websiteId,
  showLinks = true,
  children,
}: {
  websiteId: string;
  showLinks?: boolean;
  children?: ReactNode;
}) {
  const { formatMessage, labels } = useMessages();
  const { renderTeamUrl } = useTeamUrl();
  const pathname = usePathname();
  const { data: website } = useWebsite(websiteId);
  const { name, domain } = website || {};

  const links = [
    { label: formatMessage(labels.overview), icon: <Icons.Overview />, path: '' },
    { label: formatMessage(labels.events), icon: <Lightning />, path: '/events' },
    { label: formatMessage(labels.sessions), icon: <Icons.User />, path: '/sessions' },
    { label: formatMessage(labels.realtime), icon: <Icons.Clock />, path: '/realtime' },
    { label: formatMessage(labels.compare), icon: <Icons.Compare />, path: '/compare' },
    { label: formatMessage(labels.reports), icon: <Icons.Reports />, path: '/reports' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5 py-5">
      {/* Title Section */}
      <div className="flex flex-row items-center gap-2.5 text-[24px] font-bold overflow-hidden h-[60px]">
        <Favicon domain={domain} />
        <Text>{name}</Text>
        <ActiveUsers websiteId={websiteId} />
      </div>

      {/* Actions Section */}
      <div className="flex flex-row items-center justify-end gap-7.5 ml-auto min-h-0">
        {showLinks && (
          <div className="flex flex-row items-center">
            {links.map(({ label, icon, path }) => {
              const selected = path
                ? pathname.includes(path)
                : pathname.match(/^\/websites\/[\w-]+$/);

              return (
                <Link key={label} href={renderTeamUrl(`/websites/${websiteId}${path}`)} shallow={true}>
                  <Button variant="quiet" className={classNames({ 'font-bold': selected })}>
                    <Icon className="w-5 h-5">{icon}</Icon>
                    <Text className="hidden">{label}</Text>
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default WebsiteHeader;
