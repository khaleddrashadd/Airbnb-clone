import { formattedCountries } from '@/lib/worldCountries';

const useCountry = () => {
  const getAll = formattedCountries;
  const getCountryByName = name => {
    const country = formattedCountries.find(country => country.value === name);
    return country;
  };

  return { getCountryByName, getAll };
};
export default useCountry;
