import useCountry from '@/hooks/useCountry';
import Avatar from '../header/Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../Map'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getCountryByName } = useCountry();
  const { lating } = getCountryByName(locationValue);

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <span>Hosted by {user?.name}</span>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center font-light gap-4 text-neutral-500">
          <span>{guestCount} geusts</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
        </div>
        <hr />
        {category && (
          <ListingCategory
            Icon={category?.icon}
            label={category?.label}
            description={category?.description}
          />
        )}
        <hr />
        <span className="text-lg font-light text-neutral-500">
          {description}
        </span>
        <hr />
        <Map center={lating} />
    </div>
  );
};
export default ListingInfo;
