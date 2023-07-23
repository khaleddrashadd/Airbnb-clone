'use client';
import { useModal } from '@/hooks';
import { CategoryInput, Counter, CountrySelect, Heading, Map, Modal } from '..';
import { useReducer, useState } from 'react';
import { categories } from '@/data';

const STEPS = {
  category: 0,
  location: 1,
  info: 2,
  images: 3,
  description: 4,
  price: 5,
};
const INITIAL_STATE = {
  category: '',
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: '',
  price: 1,
  title: '',
  description: '',
};
const rentReducer = (state, action) => {
  switch (action.type) {
    case 'CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'GUEST_COUNT':
      return {
        ...state,
        guestCount: action.payload,
      };
    case 'ROOM_COUNT':
      return {
        ...state,
        roomCount: action.payload,
      };
    case 'BATHROOM_COUNT':
      return {
        ...state,
        bathroomCount: action.payload,
      };

    default:
      break;
  }
};

const RentModal = () => {
  const modal = useModal();
  const [steps, setSteps] = useState(STEPS.category);
  const [state, dispatch] = useReducer(rentReducer, INITIAL_STATE);

  const handleChooseCategory = category => {
    dispatch({ type: 'CATEGORY', payload: category });
  };

  const handleCountryChange = country => {
    dispatch({ type: 'LOCATION', payload: country });
  };

  const handleGuestCount = guestCount => {
    dispatch({ type: 'GUEST_COUNT', payload: guestCount });
  };

  const handleRoomsCount = roomCount => {
    dispatch({ type: 'ROOM_COUNT', payload: roomCount });
  };
  const handleBathroomsCount = bathroomsCount => {
    dispatch({ type: 'BATHROOM_COUNT', payload: bathroomsCount });
  };

  const onBack = () => {
    setSteps(prev => prev - 1);
  };
  const onNext = () => {
    setSteps(prev => prev + 1);
  };
  const actionLabel = steps === STEPS.price ? 'Create' : 'Next';
  const secondaryActionLabel = steps !== STEPS.category ? 'Back' : null;

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        subtitle="Pick a category"
        title="Which of these best describes your place?"
      />
      <div className="flex flex-wrap gap-3 max-h-[50vh] overflow-x-hidden">
        {categories.map(category => (
          <CategoryInput
            key={category.label}
            onClick={handleChooseCategory}
            icon={<category.icon size={30} />}
            label={category.label}
            selected={state.category === category.label}
          />
        ))}
      </div>
    </div>
  );

  if (steps === STEPS.location) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="Help guests to find you!"
          title="Where's your place located?"
        />
        <CountrySelect
          onChange={handleCountryChange}
          value={state.location}
        />
        <Map center={state?.location?.lating} />
      </div>
    );
  }
  if (steps === STEPS.info) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="Share some details about your place"
          title="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={state.guestCount}
          onChange={handleGuestCount}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={state.roomCount}
          onChange={handleRoomsCount}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={state.bathroomCount}
          onChange={handleBathroomsCount}
        />
      </div>
    );
  }
  const isDisabled =
    (!state.category && steps === STEPS.category) ||
    (!state.location && steps === STEPS.location) ;
  return (
    <Modal
      isOpen={modal.rentModalIsOpen}
      onClose={modal.rentModalOnClose}
      handleSubmit={onNext}
      actionLabel={actionLabel}
      secondaryAction={steps !== STEPS.category ? onBack : null}
      secondaryActionLabel={secondaryActionLabel}
      title="Airbnb your home"
      body={bodyContent}
      disabled={isDisabled}
    />
  );
};
export default RentModal;
