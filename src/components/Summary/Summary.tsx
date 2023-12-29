import styles from "./summary.module.css";

export interface CardProps {
  day: string;
  temp: number;
  description: string;
}

const Summary = ({ day, temp, description }: CardProps) => {


  return (
    <div className={styles.container}>
      <div className={styles.title}>{day}</div>
      <div className={styles.temp}>{`${temp} °`}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Summary;
