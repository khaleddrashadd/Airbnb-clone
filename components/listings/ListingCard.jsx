'use client'

import Image from 'next/image';
import Link from 'next/link';
import useCountry from '@/hooks/useCountry';
import { format } from 'date-fns';
import HeartButton from '../HeartButton';
import Button from '../Button';

const ListingCard = ({
  data,
  currentUser,
  actionLabel,
  reservation,
  actionId,
  disabled,
  onAction,
}) => {
  const { getCountryByName } = useCountry();

  const getReservationDate = () => {
    if (!reservation) return null;
    const start = new Date(reservation?.startDate);
    const end = new Date(reservation?.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }
  const location = getCountryByName(data.locationValue);
  const price = reservation ? reservation?.totalPrice : data?.price;

  const handleCancel = e => {
    e.preventDefault();
    if (disabled) return;
    onAction(actionId);
  };

  return (
    <Link href={`/listings/${data?.id}`}>
      <div className="cursor-pointer group w-[230px] flex flex-col gap-2">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data?.imageSrc}
            fill
            className="object-cover w-full h-full group-hover:scale-110 transition"
            alt="listing image"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {getReservationDate() || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </Link>
  );
};
export default ListingCard;
