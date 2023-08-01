'use client';

import { removeData } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Container, Heading, ListingCard } from '..';

const TripsClient = ({ properties, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancel = id => {
    setDeletingId(id);
    removeData('listings',id)
      .then(res => {
        toast.success('Property deleted', { duration: 2000 });
        router.refresh();
      })
      .catch(err =>
        toast.error(err || 'Error deleting property', { duration: 2000 })
      )
      .finally(() => setDeletingId(''));
  };

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of properties you have listed"
      />
      <div className="mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-8">
        {properties.map(property => (
          <ListingCard
            key={property.id}
            data={property}
            actionId={property.id}
            actionLabel="Delete property"
            disabled={deletingId === property.id}
            onAction={handleCancel}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default TripsClient;
