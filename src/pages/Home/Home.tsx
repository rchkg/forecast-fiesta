import { useState, useEffect, useMemo } from "react";
import { useGetCurrentConditionsQuery } from "../../api/openWeather.api";
import { Location } from "../../types/Location";
import CurrentConditions from "../../components/CurrentConditions";

function Home() {
  const [ location, setLocation ] = useState<Location>({})
  const [ greeting, setGreeting ] = useState<string>("")
  const [ timeIndication, setTimeIndication ] = useState<string>("")
  const [ time, setTime ] = useState<string>("")

  //get current time and set greeting
  useMemo(() => {
    const date = new Date()
    let hours = date.getHours()
    if (hours > 12) { 
      hours -= 12
      setTimeIndication('PM')
      if(hours > 5) {
        setGreeting("Good evening")
      }
      else {
        setGreeting("Good afternoon")
      }
    } else {
      setGreeting("Good morning")
      setTimeIndication("AM")
    }
    const minutes = date.getMinutes()
    if (minutes < 10 ) {
      setTime(`${hours.toString()}:0${minutes.toString()} ${timeIndication}`)
    }
    else {
      setTime(`${hours.toString()}:${minutes.toString()} ${timeIndication}`)
    }}, 
  [])

  //get user location
  useEffect(() => navigator.geolocation.getCurrentPosition((position) => {
    const latitude = Number(parseFloat(position.coords.latitude.toString()).toFixed(2))
    const longitude = Number(parseFloat(position.coords.longitude.toString()).toFixed(2))
    setLocation({ latitude, longitude })
    console.log("location", location)
    }, () => window.alert("Location could not be found.")
  ), [])
  
  const { data, isSuccess, isError, isLoading } = useGetCurrentConditionsQuery(location)
  console.log("data", data)
  
  if (isLoading || isError ) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {isSuccess && data && (
        <CurrentConditions
          time={time}
          greeting={greeting}
          name={data.name}
          temp={data.main.temp}
          rain={data.rain['1h']}
          wind={data.wind}
          weather={data.weather[0].main}
        />
      )}
    </div>
  );
}

export default Home
