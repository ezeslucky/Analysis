import { Button, Icon, Icons, Text } from 'react-basics';

export function WebsiteTags({
  items = [],
  websites = [],
  onClick,
}: {
  items: any[];
  websites: any[];
  onClick: (e: Event) => void;
}) {
  if (websites.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-start items-start">
      {websites.map(websiteId => {
        const website = items.find(a => a.id === websiteId);

        return (
          <div key={websiteId} className="text-center mb-2 me-5">
            <Button onClick={() => onClick(websiteId)} variant="primary" size="sm">
              <Text>
                <b>{`${website.name}`}</b>
              </Text>
              <Icon>
                <Icons.Close />
              </Icon>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default WebsiteTags;
