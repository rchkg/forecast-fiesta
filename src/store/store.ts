import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { openWeatherApi } from '../api/openWeather.api';
import { accuWeatherApi } from '../api/accuweather.api';

const store = configureStore({
    reducer: {
        [openWeatherApi.reducerPath]: openWeatherApi.reducer,
        [accuWeatherApi.reducerPath]: accuWeatherApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([
        openWeatherApi.middleware,
        accuWeatherApi.middleware
      ]),
  });

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
