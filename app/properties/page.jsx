import { EmptyState, PropertiesClient } from '@/components';
import { getCurrentUser, getListings } from '../actions';

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }
  const properties = await getListings({ params: currentUser.id });

  if (!properties.length) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="You have no proerties"
      />
    );
  }

  return (
    <PropertiesClient
      properties={properties}
      currentUser={currentUser}
    />
  );
};
export default page;
