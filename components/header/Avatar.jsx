import Image from 'next/image';

const Avatar = () => {
  return (
    <Image
      src="/images/placeholder.jpg"
      width={30}
      height={30}
      alt="avatar"
      className="rounded-full"
    />
  );
};
export default Avatar;
