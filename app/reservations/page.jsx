import { getCurrentUser } from '../actions';
import { getReservations } from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import ReservationsClient from '../components/reservations/ReservationsClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }
  const authorId = currentUser.id;
  const reservations = await getReservations(authorId);
  if (!reservations.length) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="You have no reservations"
      />
    );
  }

  return (
    <ReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};
export default ReservationsPage;
