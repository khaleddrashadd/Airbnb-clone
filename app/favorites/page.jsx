import { getCurrentUser } from '../actions';
import { getFavorites } from '../actions/getFavorites';
import EmptyState from '../components/EmptyState';
import FavoritesClient from '../components/favorites/FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  const favorites = await getFavorites(currentUser.favoriteIds);

  if (!favorites.length) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="You have no favorites"
      />
    );
  }

  return (
    <FavoritesClient
      favorites={favorites}
      currentUser={currentUser}
    />
  );
};
export default FavoritesPage;
