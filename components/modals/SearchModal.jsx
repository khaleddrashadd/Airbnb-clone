'use client';

import { useModal } from '@/hooks';
import { Counter, CountrySelect, Heading, Map, Modal } from '..';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useState } from 'react';
import { formatISO } from 'date-fns';
import { DateRange } from 'react-date-range';

const STEPS = {
  LOCATION: 0,
  Date: 1,
  INFO: 2,
};

const SearchModal = () => {
  const modal = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const onBack = () => {
    setStep(val => val - 1);
  };

  const onNext = () => {
    setStep(val => val + 1);
  };

  const handleSubmit = () => {
    if (step !== STEPS.INFO) return onNext();
    const currentQuery = searchParams
      ? queryString.parse(searchParams.toString())
      : {};

    const updatedQuery = {
      ...currentQuery,
      guestCount,
      roomCount,
      bathroomCount,
      locationValue: location?.value,
    };

    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);

    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    modal.searchModalOnClose();
    router.push(url);
  };
  const actionLabel = step === STEPS.INFO ? 'Search' : 'Next';
  const secondaryActionLabel = step !== STEPS.LOCATION ? 'Back' : null;

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={val => setLocation(val)}
      />
      <hr />
      <Map center={location.lating} />
    </div>
  );

  if (step === STEPS.Date) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you want to go?"
          subtitle="Find the perfect date"
        />
        <DateRange
          rangeColors={['#262626']}
          ranges={[dateRange]}
          date={new Date()}
          onChange={val => setDateRange(val.selection)}
          direction="vertical"
          showDateDisplay={false}
          minDate={new Date()}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More iformation"
          subtitle="Find the perfect place"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={val => setGuestCount(val)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you want?"
          value={roomCount}
          onChange={val => setRoomCount(val)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you want?"
          value={bathroomCount}
          onChange={val => setBathroomCount(val)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={modal.searchModalIsOpen}
      onClose={modal.searchModalOnClose}
      title="Filters"
      actionLabel={actionLabel}
      handleSubmit={handleSubmit}
      secondaryAction={step !== STEPS.LOCATION ? onBack : null}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};
export default SearchModal;
