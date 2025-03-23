import Link from 'next/link';
import { Flexbox, Icon, Icons, Text } from 'react-basics';
import { Fragment } from 'react';

export interface BreadcrumbProps {
  data: {
    url?: string;
    label: string;
  }[];
}

export function Breadcrumb({ data }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-3 text-xs font-bold uppercase text-gray-600">
      {data.map((a, i) => {
        return (
          <Fragment key={i}>
            {a.url ? (
              <Link href={a.url} className="text-gray-700 hover:underline">
                <Text>{a.label}</Text>
              </Link>
            ) : (
              <Text>{a.label}</Text>
            )}
            {i !== data.length - 1 ? (
              <Icon rotate={270}>
                <Icons.ChevronDown />
              </Icon>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
