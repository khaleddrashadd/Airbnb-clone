'use client';
import { useModal } from '@/hooks';
import {
  CategoryInput,
  Counter,
  CountrySelect,
  Heading,
  ImageUpload,
  Input,
  Map,
  Modal,
} from '..';
import { useReducer, useState } from 'react';
import { categories } from '@/data';
import { postData } from '@/lib/axios';
import { toast } from 'react-hot-toast';

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
  price: 0,
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
    case 'IMAGE_SRC':
      return {
        ...state,
        imageSrc: action.payload,
      };
    case 'TITLE':
      return {
        ...state,
        title: action.payload,
      };
    case 'DESCRIPTION':
      return {
        ...state,
        description: action.payload,
      };
    case 'PRICE':
      return {
        ...state,
        price: action.payload,
      };

    default:
      return state;
  }
};

const RentModal = () => {
  const modal = useModal();
  const [steps, setSteps] = useState(STEPS.category);
  const [state, dispatch] = useReducer(rentReducer, INITIAL_STATE);
  const [isError, setIsError] = useState(false);

  const handleChooseCategory = category => {
    category && setIsError(false);
    dispatch({ type: 'CATEGORY', payload: category });
  };

  const handleCountryChange = country => {
    country && setIsError(false);
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

  const handleUploadPhoto = imageSrc => {
    imageSrc && setIsError(false);
    dispatch({ type: 'IMAGE_SRC', payload: imageSrc });
  };

  const handleEnterTitle = e => {
    e.target.value && setIsError(false);
    dispatch({ type: 'TITLE', payload: e.target.value });
  };

  const handleEnterDescription = e => {
    e.target.value && setIsError(false);
    dispatch({ type: 'DESCRIPTION', payload: e.target.value });
  };
  const handleEnterPrice = e => {
    if (e.target.value < 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
    dispatch({ type: 'PRICE', payload: e.target.value });
  };

  const error =
    (!state.category && steps === STEPS.category) ||
    (!state.location && steps === STEPS.location) ||
    (!state.imageSrc && steps === STEPS.images) ||
    ((!state.title || !state.description) && steps === STEPS.description);

  const handleSubmit = () => {
    if (error) {
      setIsError(true);
      return;
    }
    if (STEPS.price !== steps) {
      onNext();
      return;
    } else {
      postData('rent', state)
        .then(res =>
          toast.success('Created', {
            duration: 4000,
          })
        )
        .catch(err =>
          toast.error(err?.message || 'Something went wrong!', {
            duration: 4000,
          })
        );
    }
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
            isError={isError}
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
          isError={isError}
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
  if (steps === STEPS.images) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="Add a photo that best describes your place"
          title="Show guests what your place look!"
        />
        <ImageUpload
          value={state.imageSrc}
          onChange={handleUploadPhoto}
          isError={isError}
        />
      </div>
    );
  }
  if (steps === STEPS.description) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="how would you describe your place?"
          title="Short and sweet is the way to go!"
        />
        <Input
          label="Title"
          id="title"
          error={isError}
          onChange={handleEnterTitle}
          value={state.title}
          errorTitle="Cannot be empty.Please enter a valid title!"
        />
        <hr />
        <Input
          label="Description"
          id="description"
          error={isError}
          onChange={handleEnterDescription}
          value={state.description}
          errorTitle="Cannot be empty.Please enter a valid description!"
        />
      </div>
    );
  }
  if (steps === STEPS.price) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="Now, let's talk about the price"
          title="How much do you want to charge per night?"
        />
        <Input
          type="number"
          id="price"
          label="Price"
          formatPrice
          value={state.price}
          onChange={handleEnterPrice}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={modal.rentModalIsOpen}
      onClose={modal.rentModalOnClose}
      handleSubmit={handleSubmit}
      actionLabel={actionLabel}
      secondaryAction={steps !== STEPS.category ? onBack : null}
      secondaryActionLabel={secondaryActionLabel}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};
export default RentModal;
