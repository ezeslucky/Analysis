import { TextOverflow } from 'react-basics';
import { useMessages, useSessionData } from '@/components/hooks';
import Empty from '@/components/common/Empty';
import { DATA_TYPES } from '@/lib/constants';
import { LoadingPanel } from '@/components/common/LoadingPanel';

export function SessionData({ websiteId, sessionId }: { websiteId: string; sessionId: string }) {
  const { formatMessage, labels } = useMessages();
  const { data, ...query } = useSessionData(websiteId, sessionId);

  return (
    <>
      <div className="font-bold mb-5">{formatMessage(labels.properties)}</div>
      <LoadingPanel className="flex flex-col gap-5 relative" {...query} data={data}>
        {!data?.length && <Empty className="text-font-color300 text-center" />}
        {data?.map(({ dataKey, dataType, stringValue }) => {
          return (
            <div key={dataKey}>
              <div className="flex items-center justify-between">
                <div className="text-font-color200 font-bold">
                  <TextOverflow>{dataKey}</TextOverflow>
                </div>
                <div className="text-[11px] px-1.5 py-0 border border-base400 rounded-md">
                  {DATA_TYPES[dataType]}
                </div>
              </div>
              <div className="my-1.5">{stringValue}</div>
            </div>
          );
        })}
      </LoadingPanel>
    </>
  );
}
