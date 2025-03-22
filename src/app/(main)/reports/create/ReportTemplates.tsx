/* eslint-disable prettier/prettier */
import Funnel from '@/assets/funnel.svg';
import Money from '@/assets/money.svg';
import Lightbulb from '@/assets/lightbulb.svg';
import Magnet from '@/assets/magnet.svg';
import Path from '@/assets/path.svg';
import Tag from '@/assets/tag.svg';
import Target from '@/assets/target.svg';
import { useMessages, useTeamUrl } from '@/components/hooks';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { Button, Icon, Icons, Text } from 'react-basics';

export function ReportTemplates({ showHeader = true }: { showHeader?: boolean }) {
  const { formatMessage, labels } = useMessages();
  const { renderTeamUrl } = useTeamUrl();

  const reports = [
    {
      title: formatMessage(labels.insights),
      description: formatMessage(labels.insightsDescription),
      url: renderTeamUrl('/reports/insights'),
      icon: <Lightbulb />,
    },
    {
      title: formatMessage(labels.funnel),
      description: formatMessage(labels.funnelDescription),
      url: renderTeamUrl('/reports/funnel'),
      icon: <Funnel />,
    },
    {
      title: formatMessage(labels.retention),
      description: formatMessage(labels.retentionDescription),
      url: renderTeamUrl('/reports/retention'),
      icon: <Magnet />,
    },
    {
      title: formatMessage(labels.utm),
      description: formatMessage(labels.utmDescription),
      url: renderTeamUrl('/reports/utm'),
      icon: <Tag />,
    },
    {
      title: formatMessage(labels.goals),
      description: formatMessage(labels.goalsDescription),
      url: renderTeamUrl('/reports/goals'),
      icon: <Target />,
    },
    {
      title: formatMessage(labels.journey),
      description: formatMessage(labels.journeyDescription),
      url: renderTeamUrl('/reports/journey'),
      icon: <Path />,
    },
    {
      title: formatMessage(labels.revenue),
      description: formatMessage(labels.revenueDescription),
      url: renderTeamUrl('/reports/revenue'),
      icon: <Money />,
    },
  ];

  return (
    <>
      {showHeader && <PageHeader title={formatMessage(labels.reports)} />}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-5">
        {reports.map(({ title, description, url, icon }) => {
          return (
            <ReportItem key={title} icon={icon} title={title} description={description} url={url} />
          );
        })}
      </div>
    </>
  );
}

function ReportItem({ title, description, url, icon }) {
  const { formatMessage, labels } = useMessages();

  return (
    <div className="flex flex-col gap-5 p-5 border border-base500 rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-2 text-lg font-bold">
        <Icon size="lg">{icon}</Icon>
        <Text>{title}</Text>
      </div>
      <div className="flex-1 text-base text-gray-700">{description}</div>
      <div className="flex items-center justify-center">
        <Link href={url}>
          <Button variant="primary">
            <Icon>
              <Icons.Plus />
            </Icon>
            <Text>{formatMessage(labels.create)}</Text>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ReportTemplates;
