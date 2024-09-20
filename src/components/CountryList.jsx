import CountryItem from './CountryItem';
import Message from './Message';
import styles from './CountryList.module.css';
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message={'Add your first city by click on a city on the map'} />
    );

  const countriesUnique = new Set(
    cities.map((city) =>
      JSON.stringify({ country: city.country, emoji: city.emoji })
    )
  );
  const countries = [...countriesUnique].map((each) => JSON.parse(each));

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.emoji} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
