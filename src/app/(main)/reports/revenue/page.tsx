/* eslint-disable react/display-name */
import RevenueReportPage from './RevenueReportPage';
import { Metadata } from 'next';

export default function () {
  return <RevenueReportPage />;
}

export const metadata: Metadata = {
  title: 'Revenue Report',
};
