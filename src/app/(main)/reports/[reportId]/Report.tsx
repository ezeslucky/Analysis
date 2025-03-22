/* eslint-disable prettier/prettier */
import { createContext, ReactNode } from 'react';
import { Loading } from 'react-basics';
import classNames from 'classnames';
import { useReport } from '@/components/hooks';


export const ReportContext = createContext(null);

export function Report({
  reportId,
  defaultParameters,
  children,
  className,
}: {
  reportId: string;
  defaultParameters: { type: string; parameters: { [key: string]: any } };
  children: ReactNode;
  className?: string;
}) {
  const report = useReport(reportId, defaultParameters);

  if (!report) {
    return reportId ? <Loading position="page" /> : null;
  }

  return (
    <ReportContext.Provider value={report}>
      <div className={classNames("grid grid-rows-[max-content_1fr] grid-cols-[max-content_1fr] mb-[60px] h-[90vh]", className)}>{children}</div>
    </ReportContext.Provider>
  );
}

export default Report;
