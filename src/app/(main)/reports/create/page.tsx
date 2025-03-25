/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import ReportCreatePage from './ReportCreatePage';
import { Metadata } from 'next';

export default function () {
  return <ReportCreatePage />;
}

export const metadata: Metadata = {
  title: 'Create Report',
};
