import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="logo"
        className="w-auto h-auto"
        height={100}
        width={100}
        priority
      />
    </Link>
  );
};
export default Logo;
