import CityItem from './CityItem';
import Message from './Message';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import { useCities } from '../contexts/CitiesProvider';

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message={'Add your first city by click on a city on the map'} />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
