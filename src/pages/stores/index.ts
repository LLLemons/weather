import React from 'react';
import _ from 'lodash';

type State = {
  cities: {
    location: string;
    cid: string;
    lat: string;
    lon: string;
    tz: string;
  }[]
}

export const WeatherStore = React.createContext({});

export const reducer = (state:State, action: {
  type: string;
  payload: any
}) => {
  switch (action.type) {
    case 'add':
      const isFind = state.cities.find(item => item.cid === action.payload.cid)
      if (isFind) {
        alert('不能重复添加')
        return { ...state }
      }
      return {
        ...state,
        cities: [...state.cities, action.payload]
      }
    case 'delete':
      const cities = _.cloneDeep(state.cities)
      cities.splice(action.payload, 1)
      return {
        ...state,
        cities
      }
    default:
      return state
  }
}
export const init = (initialParams:State):State => {
  return {
    cities: [{
      cid: "CN101230101",
      location: "福州",
      lat: "26.07530212",
      lon: "119.30623627",
      tz: "+8.00"
    },{
      cid: "CN101010100",
      location: "北京",
      lat: "39.90498734",
      lon: "116.4052887",
      tz: "+8.00"
    },{
      cid: "CN101020100",
      location: "上海",
      lat: "31.23170662",
      lon: "121.47264099",
      tz: "+8.00"
    }]
  }
}