import { getCurrentUser } from '@/app/actions';
import { getListingById } from '@/app/actions/getListingById';
import { getReservations } from '@/app/actions/getReservations';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from '@/app/components/listings/ListingClient';

const ListingPage = async ({ params: { listingId } }) => {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(listingId);

  if (!listing) {
    return (
      <EmptyState
        showReset
        title="No listings found"
        subtitle="Try searching for something else or go back"
        label="Go back!"
      />
    );
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};
export default ListingPage;
