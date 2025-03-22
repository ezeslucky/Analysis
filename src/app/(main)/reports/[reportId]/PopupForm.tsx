/* eslint-disable prettier/prettier */
import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';

 
export function PopupForm({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={classNames("bg-gray-50 min-w-[300px] p-5 border border-gray-400 rounded-lg shadow-[0_0_0_5px_rgba(0,0,0,0.1)] z-[1000]", className)}
      style={style}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export default PopupForm;
