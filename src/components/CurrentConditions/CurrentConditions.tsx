import { useFahrenheit } from "../../hooks/useFahrenheit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import styles from './currentConditions.module.css'
import { createPortal } from "react-dom";

export interface CurrentConditionsProps {
    time: string;
    greeting: string;
    name: string;
    temp: number;
    rain?: number;
    wind: {
        speed: number;
        deg: number;
    }
    weather: string;
}

const CurrentConditions = ({time, greeting, name, temp, rain, wind, weather}: CurrentConditionsProps) => {
    
    const displayTemp = Number(parseFloat(useFahrenheit(temp).toString()).toFixed(2));

    return (
      <div className={styles.container}>
        <div className={styles.medFont}>{`${greeting}!`}</div>
        <div className={styles.smallFont}>{`It's ${time} in ${name}`}</div>
        <div className={styles.largeFont}>{`${displayTemp} °`}</div>
        <span className={styles.description}>{weather}</span>
        {createPortal(
          <div className={styles.detailsContainer}>
            <div>
              <FontAwesomeIcon icon={faWind} style={{color: "grey"}}/>
              <span className={styles.smallFont}>{`  ${wind.speed} mph`}</span>
            </div>
            {rain && (<div>
              <FontAwesomeIcon icon={faDroplet} style={{color: "grey"}}/>
              <span className={styles.smallFont}>{`   ${rain} mm`}</span>
            </div>)}
          </div>, document.body)}
      </div>
    );
}

export default CurrentConditions