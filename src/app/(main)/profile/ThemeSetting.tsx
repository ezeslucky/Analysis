/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { Button, Icon } from 'react-basics';
import { useTheme } from '@/components/hooks';
import Sun from '@/assets/sun.svg';
import Moon from '@/assets/moon.svg';
import styles from './ThemeSetting.module.css';

export function ThemeSetting() {
  const { theme, saveTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button
        className={classNames({ ["border-2 border-primary-400"]: theme === 'light' })}
        onClick={() => saveTheme('light')}
      >
        <Icon>
          <Sun />
        </Icon>
      </Button>
      <Button
        className={classNames({ ["border-2 border-primary-400 "]: theme === 'dark' })}
        onClick={() => saveTheme('dark')}
      >
        <Icon>
          <Moon />
        </Icon>
      </Button>
    </div>
  );
}

export default ThemeSetting;
