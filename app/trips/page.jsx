import { getCurrentUser } from '../actions';
import { getReservations } from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import TripsClient from '../components/trips/TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthrized"
        subtitle="Please login"
      />
    );
  }
  const userId = currentUser.id;
  const reservations = await getReservations(userId);
  if (!reservations.length) {
    return (
      <EmptyState
        title="No Trips found"
        subtitle="You have no trips"
      />
    );
  }


  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};
export default TripsPage;
