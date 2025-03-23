import { useTransition, animated } from '@react-spring/web';
import { Button, Icon } from 'react-basics';
import { useTheme } from '@/components/hooks';
import Icons from '@/components/icons';
import classNames from 'classnames';

export function ThemeButton() {
  const { theme, saveTheme } = useTheme();

  const transitions = useTransition(theme, {
    initial: { opacity: 1 },
    from: {
      opacity: 0,
      transform: `translateY(${theme === 'light' ? '20px' : '-20px'}) scale(0.5)`,
    },
    enter: { opacity: 1, transform: 'translateY(0px) scale(1.0)' },
    leave: {
      opacity: 0,
      transform: `translateY(${theme === 'light' ? '-20px' : '20px'}) scale(0.5)`,
    },
  });

  function handleClick() {
    saveTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <Button
      variant="quiet"
      onClick={handleClick}
      className="w-[50px] flex justify-center items-center cursor-pointer relative"
    >
      {transitions((style, item) => (
        <animated.div key={item} style={style} className="absolute flex justify-center items-center">
          <Icon>{item === 'light' ? <Icons.Sun /> : <Icons.Moon />}</Icon>
        </animated.div>
      ))}
    </Button>
  );
}

export default ThemeButton;
