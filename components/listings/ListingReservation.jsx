'use client';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { Button } from '@/components';

const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  onSubmit,
  onChange,
  disabledDates,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border-1 text-center border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <span className="text-2xl font-semibold">{price}</span>
        <span className="font-light text-neutral-600">/ night</span>
      </div>
      <DateRange
        ranges={[dateRange]}
        onChange={onChange}
        disabledDates={disabledDates}
        date={new Date()}
        direction="vertical"
        minDate={new Date()}
        showDateDisplay={false}
        rangeColors={['#262626']}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          onClick={onSubmit}
          label="Reserve"
        />
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
};
export default ListingReservation;
