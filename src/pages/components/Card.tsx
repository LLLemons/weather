import React, { useState, useEffect, CSSProperties, useContext } from 'react';
import styles from './card.css';
import { getNowWeather, getForecastWeather } from '../services';
import router from 'umi/router';
import { httpGet } from '../utils/RequestUtil/request';
import { ContextProps, WeatherStore } from '../stores';

interface Props {
  baisc: {
    location: string;
    cid: string;
    lat: string;
    lon: string;
    tz: string;
  };
}

function getCurrentTime(type?: 'yyyy-mm-dd' | 'yyyyMMdd' | 'format', yesterday: boolean = false) {
  const weeks = ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July ',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  let date = new Date();
  if (yesterday) {
    date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const week = date.getDay();
  if (type === 'yyyy-mm-dd') {
    return `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${+day < 10 ? `0${day}` : day}`;
  }
  if (type === 'yyyyMMdd') {
    return `${year}${month + 1 < 10 ? `0${month + 1}` : month + 1}${+day < 10 ? `0${day}` : day}`;
  }
  return `${weeks[week]},${months[month]} ${+day < 10 ? `0${day}` : day},${year}`;
}

const Card: React.FC<Props> = ({ baisc }) => {
  const [currentData, setCurrentData] = useState<{
    basic: any;
    now: any;
    airNow: any;
    history: {
      basic: any;
      daily_weather: any;
    };
  }>({
    basic: {},
    now: {},
    airNow: {},
    history: {
      basic: {},
      daily_weather: {},
    },
  });
  const [mainStyle, setMainStyle] = useState<CSSProperties>({
    WebkitTransform: 'rotateY(0)',
    transform: 'rotateY(0)',
  });
  const [backStyle, setBackStyle] = useState<CSSProperties>({
    WebkitTransform: 'rotateY(180deg)',
    transform: 'rotateY(180deg)',
  });
  const { state, dispatch } = useContext<ContextProps>(WeatherStore);
  const getNowWeatherData = async () => {
    return await httpGet('/weather/now', {
      location: baisc.location,
    });
  };
  const getAirData = async () => {
    return await httpGet('/air/now', {
      location: baisc.location,
    });
  };
  const getHistoryWeather = async () => {
    return await httpGet('/weather/historical', {
      location: baisc.cid,
      date: getCurrentTime('yyyy-mm-dd', true),
    });
  };
  const loadData = async () => {
    const [weatherData, airData, historicalData] = await Promise.all([
      getNowWeatherData(),
      getAirData(),
      getHistoryWeather(),
    ]);
    setCurrentData({
      ...weatherData.data.HeWeather6[0],
      airNow: airData.data.HeWeather6[0].air_now_city,
      history: {
        basic: historicalData.data.HeWeather6[0].basic,
        daily_weather: historicalData.data.HeWeather6[0].daily_weather,
      },
    });
  };
  const handleToNebula = () => {
    router.push('/neBulaMap');
  };
  const handleRotateToMain = () => {
    setMainStyle({
      WebkitTransform: 'rotateY(0)',
      transform: 'rotateY(0)',
    });
    setBackStyle({
      WebkitTransform: 'rotateY(180deg)',
      transform: 'rotateY(180deg)',
    });
  };
  const handleRotateToBack = () => {
    setMainStyle({
      WebkitTransform: 'rotateY(-180deg)',
      transform: 'rotateY(-180deg)',
    });
    setBackStyle({
      WebkitTransform: 'rotateY(0)',
      transform: 'rotateY(0)',
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={`${styles.container} ${styles.positive}`} style={mainStyle}>
          <div
            className={styles.main}
            onClick={() => {
              router.push({
                pathname: '/detail',
                query: {
                  cid: currentData.basic.cid,
                  location: currentData.basic.location,
                  lat: currentData.basic.lat,
                  lon: currentData.basic.lon,
                  tz: 8,
                  date: getCurrentTime('yyyyMMdd'),
                },
              });
            }}
          >
            <div className={styles.location}>{currentData.basic.location}</div>
            <div className={styles.date}>{getCurrentTime()}</div>
            <div className={styles.temperature}>{currentData.now.tmp} ℃</div>
            <div className={styles.line}>--------</div>
            <div className={styles.cond}>{currentData.now.cond_txt}</div>
            <div className={styles.wind}>
              {currentData.now.wind_dir}/{currentData.now.wind_sc}级
            </div>
            {state.airQulity ? (
              <>
                <div>空气质量指数 {currentData.airNow.aqi}</div>
                <div>主要污染物 {currentData.airNow.main}</div>
                <div>空气质量 {currentData.airNow.qlty}</div>
                <div>
                  pm10 {currentData.airNow.pm10} pm25 {currentData.airNow.pm25}
                </div>
                <div>
                  二氧化氮 {currentData.airNow.no2} 二氧化硫 {currentData.airNow.so2}
                </div>
                <div>
                  一氧化碳 {currentData.airNow.co} 臭氧 {currentData.airNow.o3}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* <div className={styles.add}>+</div> */}
          <div className={styles.add} onClick={handleRotateToBack}>
            <i className={`iconfont ${styles.iconPic}`}>&#xe66a;</i>
          </div>
        </div>
        <div className={`${styles.container} ${styles.back}`} style={backStyle}>
          <div
            className={styles.main}
            onClick={() => {
              router.push({
                pathname: '/detail',
                query: {
                  location: currentData.basic.location,
                },
              });
            }}
          >
            <div className={styles.location}>{currentData.history.basic.location}</div>
            <div className={styles.date}>{getCurrentTime('format', true)}</div>
            <div className={styles.temperature}>
              {currentData.history.daily_weather.tmp_max}/
              {currentData.history.daily_weather.tmp_min} ℃
            </div>
            <div className={styles.line}>--------</div>
            <div className={styles.cond}>相对湿度{currentData.history.daily_weather.hum}</div>
            <div className={styles.cond}>降水量{currentData.history.daily_weather.pcpn}</div>
            <div className={styles.cond}>大气压强{currentData.history.daily_weather.pres}</div>
          </div>
          <div className={styles.add} onClick={handleRotateToMain}>
            <i className={`iconfont ${styles.iconPic}`}>&#xe66b;</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
