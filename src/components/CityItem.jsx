import styles from './CityItem.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('');
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function CityItem({ city }) {
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{flagemojiToPNG(city.emoji)}</span>
      <h3 className={styles.name}>{city.cityName}</h3>
      <time className={styles.date}>({formatDate(city.date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
