import React from 'react';

type State = {
  cities: any[]
}

export const WeatherStore = React.createContext({});

export const reducer = (state:State, action: {
  type: string;
  payload: any
}) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        weather: [...state.cities, action.payload]
      }
    default:
      return state
  }
}
export const init = (initialParams:State):State => {
  return {
    cities: ['fuzhou', 'beijing', 'shanghai']
  }
}