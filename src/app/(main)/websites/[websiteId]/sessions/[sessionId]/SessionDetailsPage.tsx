'use client';
import Avatar from '@/components/common/Avatar';
import { LoadingPanel } from '@/components/common/LoadingPanel';
import { useWebsiteSession } from '@/components/hooks';
import WebsiteHeader from '../../WebsiteHeader';
import { SessionActivity } from './SessionActivity';
import { SessionData } from './SessionData';
import SessionInfo from './SessionInfo';
import { SessionStats } from './SessionStats';

export default function SessionDetailsPage({
  websiteId,
  sessionId,
}: {
  websiteId: string;
  sessionId: string;
}) {
  const { data, ...query } = useWebsiteSession(websiteId, sessionId);

  return (
    <LoadingPanel {...query} loadingIcon="spinner" data={data}>
      <WebsiteHeader websiteId={websiteId} />
      <div className="grid grid-cols-[max-content_1fr_max-content] mb-10 relative md:grid-cols-1 md:gap-7.5">
        {/* Sidebar */}
        <div className="flex flex-col items-center justify-start gap-5 w-[300px] pr-5 border-r border-base300 relative md:border-0 md:w-auto">
          <Avatar seed={data?.id} />
          <SessionInfo data={data} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-7.5 px-5 relative">
          <SessionStats data={data} />
          <SessionActivity
            websiteId={websiteId}
            sessionId={sessionId}
            startDate={data?.firstAt}
            endDate={data?.lastAt}
          />
        </div>

        {/* Data Section */}
        <div className="w-[300px] border-l border-base300 pl-5 relative transition-all duration-200 ease-in-out md:border-0 md:w-auto">
          <SessionData websiteId={websiteId} sessionId={sessionId} />
        </div>
      </div>
    </LoadingPanel>
  );
}
