import styles from './HotelCard.module.css';

const HotelCard = ({image, destination, price, duration }) => {
    return (
        <>
        <div className={styles.travelCard}>
        <img src={image} alt={destination} className={styles.travelCardImage} />
        <div className={styles.travelCardContent}>
          <h3>{destination}</h3>
          <p className={styles.price}>{price}</p>
          <div className={styles.details}>
            <span>⭐ {duration}</span>
          </div>
        </div>
      </div>
      </>
    );
};

export default HotelCard;