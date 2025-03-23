import { Key } from 'react';
import { Text, Icon, Button, Popup, Menu, Item, PopupTrigger, Flexbox } from 'react-basics';
import classNames from 'classnames';
import Icons from '@/components/icons';
import { useLogin, useMessages, useTeams, useTeamUrl } from '@/components/hooks';

export function TeamsButton({
  className,
  showText = true,
  onChange,
}: {
  className?: string;
  showText?: boolean;
  onChange?: (value: string) => void;
}) {
  const { user } = useLogin();
  const { formatMessage, labels } = useMessages();
  const { result } = useTeams(user.id);
  const { teamId } = useTeamUrl();
  const team = result?.data?.find(({ id }) => id === teamId);

  const handleSelect = (close: () => void, id: Key) => {
    onChange?.((id !== user.id ? id : '') as string);
    close();
  };

  if (!result?.count) {
    return null;
  }

  return (
    <PopupTrigger>
      <Button className={classNames('font-bold', className)} variant="quiet">
        <Icon>{teamId ? <Icons.Users /> : <Icons.User />}</Icon>
        {showText && <Text>{teamId ? team?.name : user.username}</Text>}
        <Icon>
          <Icons.ChevronDown />
        </Icon>
      </Button>
      <Popup alignment="end">
        {(close: () => void) => (
          <Menu className="bg-gray-100 min-w-[260px]" variant="popup" onSelect={handleSelect.bind(null, close)}>
            <div className="text-gray-600 text-xs font-bold uppercase px-4 py-2 border-b border-gray-300">
              {formatMessage(labels.myAccount)}
            </div>
            <Item key={user.id} className={classNames({ 'font-bold': !teamId })}>
              <Flexbox gap={2} alignItems="center">
                <Icon>
                  <Icons.User />
                </Icon>
                <Text>{user.username}</Text>
              </Flexbox>
            </Item>
            <div className="text-gray-600 text-xs font-bold uppercase px-4 py-2 border-b border-gray-300">
              {formatMessage(labels.team)}
            </div>
            {result?.data?.map(({ id, name }) => (
              <Item key={id} className={classNames({ 'font-bold': id === teamId })}>
                <Flexbox gap={2} alignItems="center">
                  <Icon>
                    <Icons.Users />
                  </Icon>
                  <Text>{name}</Text>
                </Flexbox>
              </Item>
            ))}
          </Menu>
        )}
      </Popup>
    </PopupTrigger>
  );
}

export default TeamsButton;
