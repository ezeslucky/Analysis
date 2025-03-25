/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import FunnelReportPage from './FunnelReportPage';
import { Metadata } from 'next';

export default function () {
  return <FunnelReportPage />;
}

export const metadata: Metadata = {
  title: 'Funnel Report',
};
