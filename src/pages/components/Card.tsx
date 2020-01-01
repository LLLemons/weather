import React, { useState, useEffect } from 'react';
import styles from './card.css';
import { getNowWeather, getForecastWeather } from '../services';

interface Props {
  location: string;
}

const Card: React.FC<Props> = ({ location }) => {
  const [currentWeather, setCurrentWeather] = useState({
    basic: {},
    now: {},
  });
  const getNowWeatherData = async (location: string) => {
    const { data, success } = await getNowWeather({ location });
    if (success) {
      setCurrentWeather(data.HeWeather6[0]);
    }
  };
  const loadData = async () => {
    await getNowWeatherData(location);
  };
  useEffect(() => {
    // loadData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.location}>{currentWeather.basic.location}</div>
          <div className={styles.date}>Tuesday,July 05,2019</div>
          <div className={styles.temperature}>{currentWeather.now.tmp} ℃</div>
          <div className={styles.line}>--------</div>
          <div className={styles.cond}>{currentWeather.now.cond_txt}</div>
          <div className={styles.wind}>
            {currentWeather.now.wind_dir}/{currentWeather.now.wind_sc}级
          </div>
        </div>
        <div className={styles.add}>+</div>
      </div>
    </div>
  );
};

export default Card;
