'use client';
import useCountry from '@/hooks/useCountry';
import Select from 'react-select';

const CountrySelect = ({ value, onChange, isError }) => {
  const {getAll } = useCountry();

  return (
    <div>
      <Select
        placeholder="Select Country"
        options={getAll}
        isSearchable
        isClearable
        className={`${isError ? 'border-rose-500' : 'border-neutral-200'}`}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
        value={value}
        onChange={value => onChange(value)}
        formatOptionLabel={option => (
          <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1 text-sm">
                {option.region}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
};
export default CountrySelect;
