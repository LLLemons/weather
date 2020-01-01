import { httpGet } from '../utils/RequestUtil/request';

/**
 * 获取实况天气
 */
export const getNowWeather = (data: { location: string }) => {
  return httpGet('/weather/now', data);
};
/**
 * 获取3-10天天气预报
 */
export const getForecastWeather = (data: { location: string }) => {
  return httpGet('/weather/forecast', data);
};
