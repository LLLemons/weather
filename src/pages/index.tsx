import React, { useEffect, useState, useReducer, useContext, useLayoutEffect } from 'react';
import styles from './index.css';
import Card from './components/Card';
import { httpGet } from './utils/RequestUtil/request';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
import { getNowWeather, getForecastWeather } from './services/index';
import ForecastWeathers from './components/ForecastWeathers';
import { reducer, init, WeatherStore } from './stores';

interface Props {
  location: {
    query: {
      index: string;
    };
  };
}

const Index: React.FC<Props> = props => {
  const initialSlide = +props.location.query.index || 0;
  const { state, dispatch } = useContext(WeatherStore);
  useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      speed: 400,
      spaceBetween: 30,
      autoHeight: true,
      loop: true,
      initialSlide,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }, [state]);
  return (
    <div className={styles.wrapper}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {state.cities.map(item => (
            <div className="swiper-slide">
              <div className={styles.swiperItemWrapper}>
                <Card baisc={item} />
                <ForecastWeathers location={item.location} />
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
};
export default Index;
