import React, { Reducer } from 'react';
import _ from 'lodash';

export type StateProps = {
  cities: {
    location: string;
    cid: string;
    lat: string;
    lon: string;
    tz: string;
  }[],
  heightConfig: boolean,
  airQulity: boolean,
  map: boolean
}

export interface ReducerProps {
  (v1: StateProps, v2: {
    type: string;
    payload: any
  }): StateProps
}

interface DispatchProps {
  (v: {
    type: string;
    payload: any
  }) : void
}

export interface ContextProps {
  state:StateProps,
  dispatch: DispatchProps
}

export const WeatherStore = React.createContext<ContextProps>({} as ContextProps);

export const reducer:ReducerProps = (state: StateProps, action: {
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
      if (cities.length === 1) {
        alert('已经不能再少啦')
        return {
          ...state
        }
      }
      cities.splice(action.payload, 1)
      return {
        ...state,
        cities
      }
    case 'toggleShow':
      const config = action.payload;
      const value = state[config];
      return {
        ...state,
        [config]: !value
      }
    default:
      return state
  }
}
export const init = (initialParams: StateProps): StateProps => {
  return {
    cities: [{
      cid: "CN101230101",
      location: "福州",
      lat: "26.07530212",
      lon: "119.30623627",
      tz: "+8.00"
    }, {
      cid: "CN101010100",
      location: "北京",
      lat: "39.90498734",
      lon: "116.4052887",
      tz: "+8.00"
    }, {
      cid: "CN101020100",
      location: "上海",
      lat: "31.23170662",
      lon: "121.47264099",
      tz: "+8.00"
    }],
    heightConfig: false,
    airQulity: false,
    map: false
  }
}