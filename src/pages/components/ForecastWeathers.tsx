import React, { useState, useEffect } from 'react';
import styles from './forecastWeathers.less';
import weatherCode from '../utils/weatherUtil/weatherCode';
import { getForecastWeather } from '../services';

interface Props {
  location: string;
}

const ForecastWeathers: React.FC<Props> = ({ location }) => {
  const [forecastWeathers, setForecastWeathers] = useState([]);
  const getForecastWeatherData = async (location: string) => {
    const { data, success } = await getForecastWeather({ location });
    if (success) {
      setForecastWeathers(data.HeWeather6[0].daily_forecast.splice(0, 3));
    }
  };
  const loadData = async () => {
    await getForecastWeatherData(location);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className={styles.wrapper}>
      {forecastWeathers.map((item, index) => (
        <div className={styles.item}>
          <span
            className={`iconfont icon-${weatherCode[item.cond_code_d] || 'qinglang'} ${
              styles.weatherIcon
            } ${index === 0 ? styles.current : ''}`}
          />
          <div>
            {item.tmp_min}℃/{item.tmp_max}℃
          </div>
          <div>{item.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeathers;
