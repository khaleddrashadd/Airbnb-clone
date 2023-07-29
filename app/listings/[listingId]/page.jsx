import { getCurrentUser } from '@/app/actions';
import { getListingById } from '@/app/actions/getListingById';
import { EmptyState } from '@/components';
import ListingClient from './ListingClient';

const page = async ({ params: { listingId } }) => {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState
        showReset
        title="No listings found"
        subtitle='Try searching for something else or go back'
        label="Go back!"
      />
    );
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
    />
  );
};
export default page;
