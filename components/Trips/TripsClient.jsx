'use client';

import { removeData } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Container from '../Container';
import Heading from '../modals/Heading';
import ListingCard from '../listings/ListingCard';

const TripsClient = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancel = id => {
    setDeletingId(id);
    removeData('reservations', id)
      .then(res => {
        toast.success('Reservation canceled', { duration: 2000 });
        router.refresh();
      })
      .catch(err =>
        toast.error(err || 'Error canceling reservation', { duration: 2000 })
      )
      .finally(() => setDeletingId(''));
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you have been and where are you going?"
      />
      <div className="mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-8">
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            actionLabel="Cancel reservation"
            disabled={deletingId === reservation.id}
            onAction={handleCancel}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default TripsClient;
