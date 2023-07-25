import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartButton = ({ listingId, currentUser }) => {
  const hasFavorited = false;
  const toggleFavorite = () => {}


  return (
    <div className="relative transition cursor-pointer hover:opacity-80" onClick={toggleFavorite}>
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};
export default HeartButton;
