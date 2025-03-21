/* eslint-disable prettier/prettier */
import { Button } from 'react-basics';
import Link from 'next/link';
import Script from 'next/script';
import WebsiteSelect from '@/components/input/WebsiteSelect';
import Page from '@/components/layout/Page';
import PageHeader from '@/components/layout/PageHeader';
import EventsChart from '@/components/metrics/EventsChart';
import WebsiteChart from '../websites/[websiteId]/WebsiteChart';
import { useApi, useNavigation } from '@/components/hooks';


export function TestConsole({ websiteId }: { websiteId: string }) {
  const { get, useQuery } = useApi();
  const { data, isLoading, error } = useQuery({
    queryKey: ['websites:me'],
    queryFn: () => get('/me/websites'),
  });
  const { router } = useNavigation();

  function handleChange(value: string) {
    router.push(`/console/${value}`);
  }

  function handleRunScript() {
    window['analyzr'].track(props => ({
      ...props,
      url: '/page-view',
      referrer: 'https://www.google.com',
    }));
    window['analyzr'].track('track-event-no-data');
    window['analyzr'].track('track-event-with-data', {
      test: 'test-data',
      boolean: true,
      booleanError: 'true',
      time: new Date(),
      user: `user${Math.round(Math.random() * 10)}`,
      number: 1,
      number2: Math.random() * 100,
      time2: new Date().toISOString(),
      nested: {
        test: 'test-data',
        number: 1,
        object: {
          test: 'test-data',
        },
      },
      array: [1, 2, 3],
    });
  }

  function handleRunRevenue() {
    window['analyzr'].track(props => ({
      ...props,
      url: '/checkout-cart',
      referrer: 'https://www.google.com',
    }));
    window['analyzr'].track('checkout-cart', {
      revenue: parseFloat((Math.random() * 1000).toFixed(2)),
      currency: 'USD',
    });
    window['analyzr'].track('affiliate-link', {
      revenue: parseFloat((Math.random() * 1000).toFixed(2)),
      currency: 'USD',
    });
    window['analyzr'].track('promotion-link', {
      revenue: parseFloat((Math.random() * 1000).toFixed(2)),
      currency: 'USD',
    });
    window['analyzr'].track('checkout-cart', {
      revenue: parseFloat((Math.random() * 1000).toFixed(2)),
      currency: 'EUR',
    });
    window['analyzr'].track('promotion-link', {
      revenue: parseFloat((Math.random() * 1000).toFixed(2)),
      currency: 'EUR',
    });
    window['analyzr'].track('affiliate-link', {
      item1: {
        productIdentity: 'ABC424',
        revenue: parseFloat((Math.random() * 10000).toFixed(2)),
        currency: 'JPY',
      },
      item2: {
        productIdentity: 'ZYW684',
        revenue: parseFloat((Math.random() * 10000).toFixed(2)),
        currency: 'JPY',
      },
    });
  }

  function handleRunIdentify() {
    window['analyzr'].identify({
      userId: 123,
      name: 'brian',
      number: Math.random() * 100,
      test: 'test-data',
      boolean: true,
      booleanError: 'true',
      time: new Date(),
      time2: new Date().toISOString(),
      nested: {
        test: 'test-data',
        number: 1,
        object: {
          test: 'test-data',
        },
      },
      array: [1, 2, 3],
    });
  }

  if (!data) {
    return null;
  }

  const website = data?.data.find(({ id }) => websiteId === id);

  return (
    <Page isLoading={isLoading} error={error}>
      <PageHeader title="Test console">
        <WebsiteSelect websiteId={website?.id} onSelect={handleChange} />
      </PageHeader>
      {website && (
        <div className=" grid  gap-[30px] pb-10">
          <Script
            async
            data-website-id={websiteId}
            src={`${process.env.basePath || ''}/script.js`}
            data-cache="true"
          />
          <div className="border border-[var(--base400)] rounded-md p-5 grid gap-10 grid-cols-3 min-w-[300px] shadow-[0_0_0_10px_var(--base100)]">
            <div className="flex flex-col gap-2.5">
              <div className="text-base font-bold my-5">Page links</div>
              <div>
                <Link href={`/console/${websiteId}/page/1/?q=abc`}>page one</Link>
              </div>
              <div>
                <Link href={`/console/${websiteId}/page/2/?q=123 `}>page two</Link>
              </div>
              <div>
                <a href="https://www.google.com" data-analyzr-event="external-link-direct">
                  external link (direct)
                </a>
              </div>
              <div>
                <a
                  href="https://www.google.com"
                  data-analyzr-event="external-link-tab"
                  target="_blank"
                  rel="noreferrer"
                >
                  external link (tab)
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="text-base font-bold my-5">Click events</div>
              <Button id="send-event-button" data-analyzr-event="button-click" variant="primary">
                Send event
              </Button>
              <Button
                id="send-event-data-button"
                data-analyzr-event="button-click"
                data-analyzr-event-name="bob"
                data-analyzr-event-id="123"
                variant="primary"
              >
                Send event with data
              </Button>
              <Button
                id="generate-revenue-button"
                data-analyzr-event="checkout-cart"
                data-analyzr-event-revenue={(Math.random() * 10000).toFixed(2).toString()}
                data-analyzr-event-currency="USD"
                variant="primary"
              >
                Generate revenue data
              </Button>
              <Button
                id="button-with-div-button"
                data-analyzr-event="button-click"
                data-analyzr-event-name={'bob'}
                data-analyzr-event-id="123"
                variant="primary"
              >
                <div className="border border-blue-900 rounded-md px-4 py-2">Button with div</div>
              </Button>
              <div data-analyzr-event="div-click" className="border border-blue-900 rounded-md px-4 py-2">
                DIV with attribute
              </div>
              <div data-analyzr-event="div-click-one" className="border border-blue-900 rounded-md px-4 py-2">
                <div data-analyzr-event="div-click-two" className="border border-blue-900 rounded-md px-4 py-2">
                  <div data-analyzr-event="div-click-three" className="border border-blue-900 rounded-md px-4 py-2">
                    Nested DIV
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="text-base font-bold my-5">Javascript events</div>
              <Button id="manual-button" variant="primary" onClick={handleRunScript}>
                Run script
              </Button>
              <Button id="manual-button" variant="primary" onClick={handleRunIdentify}>
                Run identify
              </Button>
              <Button id="manual-button" variant="primary" onClick={handleRunRevenue}>
                Revenue script
              </Button>
            </div>
          </div>
          <WebsiteChart websiteId={website.id} />
          <EventsChart websiteId={website.id} />
        </div>
      )}
    </Page>
  );
}

export default TestConsole;
