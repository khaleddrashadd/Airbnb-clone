'use client'

import EmptyState from '@/components/EmptyState';

const error = ({ error }) => {
  console.error(error);
  return (
    <EmptyState
      title="Uh Oh"
      subtitle="Something went wrong!"
    />
  );
};
export default error;
