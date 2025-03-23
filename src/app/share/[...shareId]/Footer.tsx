import { CURRENT_VERSION, HOMEPAGE_URL } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="flex flex-row items-center justify-end text-sm h-[100px]">
      <a href={HOMEPAGE_URL} className="text-font-color100">
        <b>Analyzr</b> {`v${CURRENT_VERSION}`}
      </a>
    </footer>
  );
}

export default Footer;
