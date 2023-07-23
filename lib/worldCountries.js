import countries from 'world-countries';

export const formattedCountries = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  lating: country.latlng,
}));
