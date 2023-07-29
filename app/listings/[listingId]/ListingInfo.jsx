import { Avatar, Map } from '@/components';
import useCountry from '@/hooks/useCountry';
import ListingCategory from './ListingCategory';

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
    <div className="w-[270px]">
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
            category={category}
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
