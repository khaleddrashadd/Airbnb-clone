import { Heading, HeartButton } from '@/components';
import useCountry from '@/hooks/useCountry';
import Image from 'next/image';

const ListingHead = ({ title, imgSrc, locationValue, id, currentUser }) => {
  const { getCountryByName } = useCountry();
  const country = getCountryByName(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${country?.region}, ${country.label}`}
      />
      <div className="w-full h-[60vh] rounded-xl relative overflow-hidden">
        <Image
          src={imgSrc}
          fill
          alt="listing image"
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            currentUser={currentUser}
            listingId={id}
          />
        </div>
      </div>
    </>
  );
};
export default ListingHead;
