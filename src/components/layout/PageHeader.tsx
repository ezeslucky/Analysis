import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Icon } from 'react-basics';

export function PageHeader({
  title,
  icon,
  className,
  breadcrumb,
  children,
}: {
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  breadcrumb?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      {breadcrumb && <div className="pt-5">{breadcrumb}</div>}
      <div
        className={classNames(
          'flex flex-wrap items-center justify-between h-[100px] w-full mb-2 md:mb-0',
          className
        )}
      >
        {icon && (
          <Icon size="lg" className="text-gray-700 mr-4">
            {icon}
          </Icon>
        )}

        {title && <div className="flex items-center text-2xl font-bold gap-5 h-[60px] flex-1">{title}</div>}
        
        <div className="flex justify-end">{children}</div>
      </div>
    </>
  );
}

export default PageHeader;
