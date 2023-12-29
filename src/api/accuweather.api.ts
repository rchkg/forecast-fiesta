import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Location } from "../types"

const BASE_URL = "http://dataservice.accuweather.com"
const API_KEY = "LSxOXmjFVZGgfDWo1eYyowVOjDYt1wa7"

export const accuWeatherApi = createApi({
  reducerPath: 'accuWeatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCurrentLocation: builder.query({
      query: (coordinates: Location) => 
          `/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=%20${coordinates.latitude}%2C%20${coordinates.longitude}&appid=${API_KEY}`
    }),
    getFiveDayForecast: builder.query({
      query: (locationKey: number) => 
          `/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
    }),

  }),
})

export const { useGetCurrentLocationQuery, useGetFiveDayForecastQuery }  = accuWeatherApi

