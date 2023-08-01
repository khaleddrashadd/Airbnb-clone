'use client'

import { EmptyState } from '@/components';

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
