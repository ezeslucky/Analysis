/* eslint-disable prettier/prettier */
import FunnelChart from './FunnelChart';
import FunnelParameters from './FunnelParameters';
import Report from '../[reportId]/Report';
import ReportHeader from '../[reportId]/ReportHeader';
import ReportMenu from '../[reportId]/ReportMenu';
import ReportBody from '../[reportId]/ReportBody';
import Funnel from '@/assets/funnel.svg';
import { REPORT_TYPES } from '@/lib/constants';

const defaultParameters = {
  type: REPORT_TYPES.funnel,
  parameters: { window: 60, steps: [] },
};

export default function FunnelReport({ reportId }: { reportId?: string }) {
  return (
    <Report reportId={reportId} defaultParameters={defaultParameters}>
      <ReportHeader icon={<Funnel />} />
      <ReportMenu>
        <div className="flex flex-col justify-between border border-base400 rounded-[var(--border-radius)] leading-8 p-2.5 overflow-hidden">
          <FunnelParameters />
        </div>
      </ReportMenu>
      <ReportBody>
        <FunnelChart />
      </ReportBody>
    </Report>
  );
}
