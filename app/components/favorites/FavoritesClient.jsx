import Container from '../Container';
import ListingCard from '../listings/ListingCard';
import Heading from '../modals/Heading';

const FavoritesClient = ({favorites,currentUser}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited"
      />
      <div className="mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-8">
        {favorites.map(favorite => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
export default FavoritesClient