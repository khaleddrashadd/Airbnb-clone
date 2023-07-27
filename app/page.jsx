import { Categories, Container, EmptyState, ListingCard } from '@/components';
import { getCurrentUser, getListings } from './actions';

const HomePage = async () => {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <main className="">
      <Container>
        <Categories />
        <div className="pb-20 pt-28">
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
            {listings.map(listing => (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                actionLabel="click to see more"
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
