import { ReactNode, useEffect, useState } from 'react';
import { Tooltip } from 'react-basics';

export function HoverTooltip({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  return (
    <Tooltip
      className="fixed pointer-events-none z-[1000] transform -translate-x-1/2 -translate-y-[calc(100%+5px)]"
      style={{ left: position.x, top: position.y }}
    >
      {children}
    </Tooltip>
  );
}

export default HoverTooltip;
