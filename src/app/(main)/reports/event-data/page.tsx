/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import { Metadata } from 'next';
import EventDataReportPage from './EventDataReportPage';

export default function () {
  return <EventDataReportPage />;
}

export const metadata: Metadata = {
  title: 'Event Data Report',
};
