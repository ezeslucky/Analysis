/* eslint-disable prettier/prettier */
import { useContext, useState } from 'react';
import { ReportContext } from './Report';
import { Icon, Icons } from 'react-basics';
import classNames from 'classnames';

export function ReportMenu({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { report } = useContext(ReportContext);

  if (!report) {
    return null;
  }

  return (
    <div
      className={classNames(
        'relative w-[300px] pt-5 pe-5 border-e border-base300 row-start-2 row-end-3 col-start-1 col-end-2 transition-all duration-300',
        collapsed && 'w-0 p-0 overflow-hidden'
      )}
    >
      <div
        className="absolute top-0 right-0 flex justify-center items-center border border-base400 border-r-0 w-[30px] p-[5px] cursor-pointer rounded-l-md z-10 bg-white hover:bg-base75"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon rotate={collapsed ? -90 : 90}>
          <Icons.ChevronDown />
        </Icon>
      </div>
      {!collapsed && children}
    </div>
  );
}

export default ReportMenu;
