import { Icon, Button, PopupTrigger, Popup } from 'react-basics';
import { languages } from '@/lib/lang';
import { useLocale } from '@/components/hooks';
import Icons from '@/components/icons';
import classNames from 'classnames';

export function LanguageButton() {
  const { locale, saveLocale, dir } = useLocale();
  const items = Object.keys(languages).map(key => ({ ...languages[key], value: key }));

  function handleSelect(value: string, close: () => void, e: MouseEvent) {
    e.stopPropagation();
    saveLocale(value);
    close();
  }

  return (
    <PopupTrigger>
      <Button variant="quiet">
        <Icon>
          <Icons.Globe />
        </Icon>
      </Button>
      <Popup position="bottom" alignment={dir === 'rtl' ? 'start' : 'end'}>
        {(close: () => void) => {
          return (
            <div
              className={classNames(
                'grid grid-cols-3 p-2 bg-gray-100 z-50 rounded-md border border-gray-300 ml-2',
                'md:grid-cols-2 md:translate-x-10' // Responsive styling
              )}
            >
              {items.map(({ value, label }) => {
                return (
                  <div
                    key={value}
                    className={classNames(
                      'flex items-center justify-between min-w-[200px] rounded-md p-2 cursor-pointer',
                      'hover:bg-gray-300',
                      { 'font-bold bg-blue-200': value === locale }
                    )}
                    onClick={(e: any) => handleSelect(value, close, e)}
                  >
                    <span lang={value}>{label}</span>
                    {value === locale && (
                      <Icon className="text-blue-500">
                        <Icons.Check />
                      </Icon>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      </Popup>
    </PopupTrigger>
  );
}

export default LanguageButton;
