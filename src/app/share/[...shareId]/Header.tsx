import { Icon, Text } from 'react-basics';
import Link from 'next/link';
import LanguageButton from '@/components/input/LanguageButton';
import ThemeButton from '@/components/input/ThemeButton';
import SettingsButton from '@/components/input/SettingsButton';
import Icons from '@/components/icons';

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between w-full h-[100px]">
      <div>
        <Link href="/" target="_blank" className="flex flex-row items-center gap-2.5 text-lg font-bold text-font-color100 !important">
          <Icon size="lg">
            <Icons.Logo />
          </Icon>
          <Text>Analyzr</Text>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end md:flex-1">
        <ThemeButton />
        <LanguageButton />
        <SettingsButton />
      </div>
    </header>
  );
}

export default Header;
