/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import InsightsReportPage from './InsightsReportPage';
import { Metadata } from 'next';

export default function () {
  return <InsightsReportPage />;
}

export const metadata: Metadata = {
  title: 'Insights Report',
};
