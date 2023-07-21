'use client';
import { useModal } from '@/hooks';
import { CategoryInput, CountrySelect, Heading, Modal } from '..';
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
  gurestCount: 1,
  bedroomCount: 1,
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
    console.log(category);
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
          subtitle="Help guests fond you!"
          title="Where's your place located?"
        />
        <CountrySelect/>
      </div>
    );
  }

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
    />
  );
};
export default RentModal;
