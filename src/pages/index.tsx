import React, { useEffect, useState, useReducer, useContext } from 'react';
import styles from './index.css';
import Card from './components/Card';
import { httpGet } from './utils/RequestUtil/request';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
import { getNowWeather, getForecastWeather } from './services/index';
import ForecastWeathers from './components/ForecastWeathers';
import { reducer, init, WeatherStore } from './stores';

export default function() {
  const { state, dispatch } = useContext(WeatherStore);
  const [locationList, setLocationList] = useState(['fuzhou', 'beijing', 'shanghai']);
  useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      speed: 400,
      spaceBetween: 30,
      autoHeight: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {state.cities.map(item => (
            <div className="swiper-slide">
              <div className={styles.swiperItemWrapper}>
                <Card location={item} />
                <ForecastWeathers location={item} />
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
}
