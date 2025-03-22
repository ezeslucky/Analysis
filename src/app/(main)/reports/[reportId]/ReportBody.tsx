/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { ReportContext } from './Report';
import styles from './ReportBody.module.css';

export function ReportBody({ children }) {
  const { report } = useContext(ReportContext);

  if (!report) {
    return null;
  }

  return <div className="pl-5 row-start-2 row-end-3 col-start-2 col-end-3">{children}</div>;
}

export default ReportBody;
