import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Location } from "../types";

export const BASE_URL: string = 'https://api.openweathermap.org/data/2.5'
export const API_KEY: string = 'fca1d1efd3046bfefdd498aca509bfd1'

export const openWeatherApi = createApi({
  reducerPath: 'openWeatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCurrentConditions: builder.query({
      query: (coordinates: Location) => 
        `/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}`
    }),
    getDetailedFiveDayForecast: builder.query({
      query: (coordinates: Location) =>
        `/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}`
    })
  }),
})

export const { useGetCurrentConditionsQuery, useGetDetailedFiveDayForecastQuery }  = openWeatherApi