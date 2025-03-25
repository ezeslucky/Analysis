/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import GoalsReportPage from './GoalsReportPage';
import { Metadata } from 'next';

export default function () {
  return <GoalsReportPage />;
}

export const metadata: Metadata = {
  title: 'Goals Report',
};
