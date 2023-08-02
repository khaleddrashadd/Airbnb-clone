'use client';

import { useModal } from '@/hooks';
import useCountry from '@/hooks/useCountry';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Navigation = () => {
  const modal = useModal();
  const { getCountryByName } = useCountry();
  const searchParams = useSearchParams();
  const locationValue = searchParams?.get('locationValue');
  const startDate = searchParams?.get('startDate');
  const endDate = searchParams?.get('endDate');
  const guestCount = searchParams?.get('guestCount');

  const locationLabel = guestCount ? `${guestCount} Guests` : 'Add Guests';

  const guestLabel = locationValue
    ? getCountryByName(locationValue)?.label
    : 'Anywhere';

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = differenceInDays(end, start);

      if (diff === 0) {
        return `${diff + 1} Days`;
      }
      return `${diff} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  return (
    <ul
      onClick={modal.searchModalOnOpen}
      className="flex sm:flex-0 items-center justify-between text-sm border-1 md:w-auto py-2 shadow-sm rounded-full hover:shadow-md transition">
      <li className="font-semibold border-r-1 px-3">
        <div>{locationLabel}</div>
      </li>
      <li className="hidden sm:block font-semibold px-3 border-r-1">
        <div className="flex items-center px-3 gap-3">{durationLabel}</div>
      </li>
      <li>
        <div className="flex items-center px-3 gap-3">
          <span className="text-gray-600 hidden sm:block">{guestLabel}</span>
          <div className="rounded-full bg-rose-500 font-bold text-white p-1">
            <BiSearch size={18} />
          </div>
        </div>
      </li>
    </ul>
  );
};
export default Navigation;
