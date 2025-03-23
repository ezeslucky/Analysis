'use client';
import { useEffect } from 'react';
import { Icon, Text } from 'react-basics';
import Link from 'next/link';
import classNames from 'classnames';
import HamburgerButton from '@/components/common/HamburgerButton';
import ThemeButton from '@/components/input/ThemeButton';
import LanguageButton from '@/components/input/LanguageButton';
import ProfileButton from '@/components/input/ProfileButton';
import TeamsButton from '@/components/input/TeamsButton';
import Icons from '@/components/icons';
import { useMessages, useNavigation, useTeamUrl } from '@/components/hooks';
import { getItem, setItem } from '@/lib/storage';

export function NavBar() {
  const { formatMessage, labels } = useMessages();
  const { pathname, router } = useNavigation();
  const { teamId, renderTeamUrl } = useTeamUrl();

  const cloudMode = !!process.env.cloudMode;

  const links = [
    { label: formatMessage(labels.dashboard), url: renderTeamUrl('/dashboard') },
    { label: formatMessage(labels.websites), url: renderTeamUrl('/websites') },
    { label: formatMessage(labels.reports), url: renderTeamUrl('/reports') },
    { label: formatMessage(labels.settings), url: renderTeamUrl('/settings') },
  ].filter(Boolean);

  const menuItems = [
    { label: formatMessage(labels.dashboard), url: renderTeamUrl('/dashboard') },
    !cloudMode && {
      label: formatMessage(labels.settings),
      url: renderTeamUrl('/settings'),
      children: [
        ...(teamId ? [{ label: formatMessage(labels.team), url: renderTeamUrl('/settings/team') }] : []),
        { label: formatMessage(labels.websites), url: renderTeamUrl('/settings/websites') },
        ...(!teamId
          ? [
              { label: formatMessage(labels.teams), url: renderTeamUrl('/settings/teams') },
              { label: formatMessage(labels.users), url: '/settings/users' },
            ]
          : [{ label: formatMessage(labels.members), url: renderTeamUrl('/settings/members') }]),
      ],
    },
    { label: formatMessage(labels.profile), url: '/profile' },
    !cloudMode && { label: formatMessage(labels.logout), url: '/logout' },
  ].filter(Boolean);

  const handleTeamChange = (teamId: string) => {
    const url = teamId ? `/teams/${teamId}` : '/';
    if (!cloudMode) {
      setItem('analyzr.team', { id: teamId });
    }
    router.push(cloudMode ? `${process.env.cloudUrl}${url}` : url);
  };

  useEffect(() => {
    if (!cloudMode) {
      const teamIdLocal = getItem('analyzr.team')?.id;
      if (teamIdLocal && teamIdLocal !== teamId) {
        router.push(
          pathname !== '/' && pathname !== '/dashboard' ? '/' : `/teams/${teamIdLocal}/dashboard`
        );
      }
    }
  }, [cloudMode]);

  return (
    <div className="grid grid-cols-[max-content_1fr_1fr] relative items-center h-[60px] bg-base75 border-b border-base300 px-5 z-[200] md:grid-cols-2">
      {/* Logo Section */}
      <div className="flex flex-row items-center gap-2.5 text-[16px] font-bold min-w-0">
        <Icon size="lg">
          <Icons.Logo />
        </Icon>
        <Text>Analyzr</Text>
      </div>

      {/* Desktop Navigation Links */}
      <div className="flex flex-row gap-7.5 px-10 font-bold max-h-[60px] items-center md:hidden">
        {links.map(({ url, label }) => (
          <Link
            key={url}
            href={url}
            className={classNames(
              'text-font-color200 leading-[60px] border-b-2 border-transparent',
              { 'text-font-color100 border-b-2 border-primary400': pathname.startsWith(url) }
            )}
            prefetch={url !== '/settings'}
          >
            <Text>{label}</Text>
          </Link>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="flex flex-row items-center justify-end md:hidden">
        <TeamsButton onChange={handleTeamChange} />
        <ThemeButton />
        <LanguageButton />
        <ProfileButton />
      </div>

      {/* Mobile Menu */}
      <div className="hidden md:flex">
        <TeamsButton onChange={handleTeamChange} showText={false} />
        <HamburgerButton menuItems={menuItems} />
      </div>
    </div>
  );
}

export default NavBar;
