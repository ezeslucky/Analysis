'use client';
import WebsiteDetailsPage from '../../(main)/websites/[websiteId]/WebsiteDetailsPage';
import { useShareToken } from '@/components/hooks';
import Page from '@/components/layout/Page';
import Header from './Header';
import Footer from './Footer';
import { WebsiteProvider } from '@/app/(main)/websites/[websiteId]/WebsiteProvider';

export default function SharePage({ shareId }) {
  const { shareToken, isLoading } = useShareToken(shareId);

  if (isLoading || !shareToken) {
    return null;
  }

  return (
    <div className="flex-1 min-h-[calc(100vh-200px)] min-h-[calc(100dvh-200px)]">
      <Page>
        <Header />
        <WebsiteProvider websiteId={shareToken.websiteId}>
          <WebsiteDetailsPage websiteId={shareToken.websiteId} />
        </WebsiteProvider>
        <Footer />
      </Page>
    </div>
  );
}
