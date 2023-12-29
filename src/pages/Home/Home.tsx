import { useState, useEffect, useMemo } from "react";
import { useGetCurrentConditionsQuery } from "../../api/openWeather.api";
import {
  useGetCurrentLocationQuery,
  useGetFiveDayForecastQuery,
} from "../../api/accuweather.api";
import { Location } from "../../types/Location";
import CurrentConditions from "../../components/CurrentConditions";
import fiveDayForecastMock from "../../mocks/fiveDayForecast.mock.json";
import CurrentConditionsMock from "../../mocks/currentConditions.mock.json"
import Summary from "../../components/Summary";
import styles from "./home.module.css";

// const days = {
//   0: "Sunday",
//   1: "Monday",
//   2: "Tuesday",
//   3: "Wednesday",
//   4: "Thursday",
//   5: "Friday",
//   6: "Saturday"
// }
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Home() {
  const [location, setLocation] = useState<Location>({});
  const [greeting, setGreeting] = useState<string>("");
  const [timeIndication, setTimeIndication] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const date = new Date();
  const daysIndex = date.getDay();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  //get current time and set greeting
  useMemo(() => {
    setTime((time) => {
      if (hours > 12) {
        hours -= 12;
        setTimeIndication("PM");
        if (hours > 5) {
          setGreeting("Good evening");
        } else {
          setGreeting("Good afternoon");
        }
      } else {
        setGreeting("Good morning");
        setTimeIndication("AM");
      }

      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours.toString()}:${formattedMinutes.toString()} ${timeIndication}`;
    });
  }, []);

  //get user location
  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
        },
        () => window.alert("Location could not be found.")
      ),
    []
  );

  // const { data, isSuccess, isError, isLoading } = useGetCurrentConditionsQuery(location)
  const data = CurrentConditionsMock;
  const isSuccess = true;
  // const { data: city } = useGetCurrentLocationQuery(location)   ?.["EnglishName"]
  const city = "oro valley"
  // const { data: forecast } = useGetFiveDayForecastQuery(city?.Key)
  const forecast = fiveDayForecastMock;
  console.log(forecast);

  // if (isLoading || isError ) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching data</div>;
  // }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      {isSuccess && data && city && (
        <CurrentConditions
          time={time}
          greeting={greeting}
          name={city}
          temp={data.main.temp}
          rain={data.rain?.["1h"]}
          wind={data.wind}
          weather={capitalizeFirstLetter(data.weather[0].description)}
        />
      )}
      {/* { forecast.DailyForecast && ( */}
      <div className={styles.fiveDayForecast}>
        {forecast.DailyForecasts.map((day, index) => (
          <Summary
            day={daysOfWeek[(daysIndex + index)%7]}
            temp={day.Temperature.Maximum.Value}
            description={day.Day.IconPhrase}
          />
        ))}
      </div>
      {/* )} */}
    </div>
  );
}

export default Home
