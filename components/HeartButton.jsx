'use client';

import { useModal } from '@/hooks';
import { addTofavorite, removeFromfavorite } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartButton = ({ listingId, currentUser }) => {
  const { favoriteIds } = currentUser;
  const modal = useModal();
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    return favoriteIds.includes(listingId);
  }, [favoriteIds, listingId]);

  const toggleFavorite = e => {
    e.preventDefault();
    if (!currentUser) {
      modal.registerOnOpen;
      return;
    }
    if (hasFavorited) {
      removeFromfavorite(listingId)
        .then(res => {
          toast.success('Removed from favorite list successfully', {
            duration: 4000,
          });
          router.refresh();
        })
        .catch(err =>
          toast.error(err || 'Something went wrong!', { duration: 2000 })
        );
    } else {
      addTofavorite(listingId)
        .then(res => {
          toast.success('Added to favorite list successfully', {
            duration: 2000,
          });
          router.refresh();
        })
        .catch(err =>
          toast.error(err || 'Something went wrong!', { duration: 4000 })
        );
    }
  };

  return (
    <div
      className="relative transition cursor-pointer hover:opacity-80"
      onClick={toggleFavorite}>
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};
export default HeartButton;
