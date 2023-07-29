'use client';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';

import { Container } from '@/components';
import { categories } from '@/data';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';
import { useModal } from '@/hooks';
import { postData } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ListingReservation from './ListingReservation';

const intitalDate = {
  startDate: null,
  endDate: null,
  key: 'selection',
};

const ListingClient = ({ listing, currentUser, reservations = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState(intitalDate);

  const modal = useModal();
  const router = useRouter();
  const category = categories.find(cat => cat.label === listing?.category);

  const disabledDates = reservations.map(reservation => {
    const { startDate, endDate } = reservation;
    const range = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
    return range;
  });

  const handleCreateReservation = () => {
    if (!currentUser) return modal.registerOnOpen();

    setIsLoading(true);
    postData('api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    })
      .then(res => {
        toast.success('Reservation created successfully!', { duration: 2000 });
        setDateRange(intitalDate);
        //redirect to trips
        //router.push('/trips');
        router.refresh();
      })
      .catch(err => {
        toast.error(err || 'Something went wrong', { duration: 2000 });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const dayCount = differenceInCalendarDays(
      dateRange.endDate,
      dateRange.startDate
    );
    const price = dayCount * listing?.price;
    dayCount ? setTotalPrice(price) : setTotalPrice(listing?.price);
  }, [dateRange, listing?.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            imgSrc={listing?.imageSrc}
            locationValue={listing?.locationValue}
            id={listing?.id}
            title={listing?.title}
            currentUser={currentUser}
          />
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4">
            <ListingInfo
              className="flex flex-wrap items-center justify-center sm:justify-start gap-"
              bathroomCount={listing?.bathroomCount}
              category={category}
              description={listing?.description}
              guestCount={listing?.guestCount}
              locationValue={listing?.locationValue}
              roomCount={listing?.roomCount}
              user={listing?.user}
            />
            <div className="order-first md:order-last mb-10">
              <ListingReservation
                price={listing?.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onSubmit={handleCreateReservation}
                onChange={range => setDateRange(range.selection)}
                disabledDates={disabledDates}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ListingClient;
