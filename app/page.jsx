import { getCurrentUser, getListings } from './actions';
import Categories from './components/Categories';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';

const HomePage = async ({ searchParams }) => {
  const listings = await getListings({ params:searchParams} );
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
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
