import { useFarhenheit } from "../../hooks/useFarhenheit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import styles from './currentConditions.module.css'

export interface CurrentConditionsProps {
    time: string;
    greeting: string;
    name: string;
    temp: number;
    rain: number;
    wind: {
        speed: number;
        deg: number;
    }
    weather: string;
}

const CurrentConditions = ({time, greeting, name, temp, rain, wind, weather}: CurrentConditionsProps) => {
    
    
    const displayTemp = Number(parseFloat(useFarhenheit(temp).toString()).toFixed(2));
        
    return (
      <div className={styles.container}>
        <div className={styles.medFont}>{`${greeting}!`}</div>
        <div className={styles.smallFont}>{`It's ${time} in ${name}`}</div>
        <div className={styles.largeFont}>{`${displayTemp} °`}</div>
        <div className={styles.detailsContainer}>
          <span className={styles.smallFont}>{weather}</span>
          <div>
            <FontAwesomeIcon icon={faWind} style={{color: "grey"}}/>
            <span className={styles.smallFont}>{`  ${wind.speed} mph`}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faDroplet} style={{color: "grey"}}/>
            <span className={styles.smallFont}>{`   ${rain} mm`}</span>
          </div>
        </div>
      </div>
    );
}

export default CurrentConditions