/* eslint-disable prettier/prettier */
import { Metadata } from 'next';
import RetentionReportPage from './RetentionReportPage';

export default function () {
  return <RetentionReportPage />;
}

export const metadata: Metadata = {
  title: 'Retention Report',
};
