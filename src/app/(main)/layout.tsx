import { Metadata } from 'next';
import App from './App';
import NavBar from './NavBar';
import Page from '@/components/layout/Page';

export default async function ({ children }) {
  return (
    <App>
      <main className="grid grid-rows-[max-content_1fr] grid-cols-1 overflow-hidden">
        <nav className="h-[60px] w-screen col-start-1 row-start-1">
          <NavBar />
        </nav>
        <section className="col-start-1 row-start-2 min-h-0 h-[calc(100vh-60px)] h-[calc(100dvh-60px)] overflow-y-auto">
          <Page>{children}</Page>
        </section>
      </main>
    </App>
  );
}

export const metadata: Metadata = {
  title: {
    template: '%s | Analyzr',
    default: 'Analyzr',
  },
};
