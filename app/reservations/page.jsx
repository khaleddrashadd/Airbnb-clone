import { EmptyState, ReservationsClient } from '@/components';
import { getCurrentUser } from '../actions';
import { getReservations } from '../actions/getReservations';

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
