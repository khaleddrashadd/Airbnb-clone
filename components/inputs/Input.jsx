'use client';
import { BiDollar } from 'react-icons/bi';

const Input = ({
  type = 'text',
  label,
  id,
  error,
  formatPrice,
  disabled,
  onChange,
  onBlur,
  errorTitle,
  value,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        type={type}
        disabled={disabled}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 border-neutral-200 focus:ring-0 focus:border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? 'pl-10' : 'pl-4'
        } ${
          (error&&!value)
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-neutral-300 focus:border-black'
        }`}
      />
      <label
        htmlFor={id}
        className={`${formatPrice ? 'left-10' : 'left-4'} absolute ${
          (error&&!value) ? 'text-rose-500' : 'text-zinc-500'
        } text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}>
        {label}
      </label>
      <p className={`mt-2 ${(error&&!value) ? 'visible' : 'invisible'} text-rose-500`}>
        {errorTitle}
      </p>
    </div>
  );
};
export default Input;
