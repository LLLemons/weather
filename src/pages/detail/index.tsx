import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { httpGet } from '../utils/RequestUtil/request';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';

import styles from './styles.less';
import router from 'umi/router';
import NeBulaMap from '../neBulaMap';
import { ContextProps, WeatherStore } from '../stores';

// 初始化导出模块
Exporting(Highcharts);

interface Props {
  location: {
    query: {
      cid: string;
      location: string;
      lat: string;
      lon: string;
      tz: string;
      date: string;
    };
  };
}

const TIME = [
  '0000',
  '0200',
  '0400',
  '0600',
  '0800',
  '1000',
  '1200',
  '1400',
  '1600',
  '1800',
  '2000',
  '2200',
  '2400',
];

const Detail: React.FC<Props> = props => {
  const { state, dispatch } = useContext<ContextProps>(WeatherStore);
  const [hourlyData, setHourlyData] = useState([]);
  const [solarAngleDatas, setSolarAngleDatas] = useState([]);
  const getSolarElevationAngle = async (time: string | number) => {
    return await httpGet('solar/solar-elevation-angle', {
      lat: props.location.query.lat,
      lon: props.location.query.lon,
      date: props.location.query.date,
      time,
      alt: 500,
      tz: 8,
    });
  };
  const loadSolarElevationAngle = async () => {
    const data = await Promise.all(TIME.map(item => getSolarElevationAngle(item)));
    const newData = data.map(item => item.data.HeWeather6[0].solar_elevation_angle);
    setSolarAngleDatas(newData);
  };
  useEffect(() => {
    httpGet('/weather/hourly', {
      location: props.location.query.location,
    }).then(res => {
      setHourlyData(res.data.HeWeather6[0].hourly);
    });
    loadSolarElevationAngle();
  }, []);
  useEffect(() => {
    if (!hourlyData || !hourlyData.length) {
      return;
    }
    // 初始化图表
    Highcharts.chart('container', {
      chart: {
        type: 'line', //指定图表的类型，默认是折线图（line）
      },
      title: {
        text: '24小时天气预报', // 标题
      },
      xAxis: {
        categories: hourlyData.map(item => item.time.split(' ')[1]),
      },
      yAxis: {
        title: {
          text: '温度(摄氏度)', // y 轴标题
        },
      },
      series: [
        {
          // 数据列
          name: '24小时温度', // 数据列名
          data: hourlyData.map(item => +item.tmp),
        },
      ],
    });
  }, [hourlyData]);
  useEffect(() => {
    if (!solarAngleDatas || !solarAngleDatas.length || !state.heightConfig) {
      return;
    }
    // 初始化图表
    Highcharts.chart('container2', {
      chart: {
        type: 'spline', //指定图表的类型，默认是折线图（line）
      },
      title: {
        text: '太阳高度角和太阳方位角随时间变化图', // 标题
      },
      xAxis: {
        categories: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
      },
      yAxis: {
        title: {
          text: '角度', // y 轴标题
        },
      },
      series: [
        {
          // 数据列
          name: '太阳高度角', // 数据列名
          data: solarAngleDatas.map(item => (item ? +item.solar_elevation_angle : 0)),
        },
        {
          // 数据列
          name: '太阳方位角', // 数据列名
          data: solarAngleDatas.map(item => (item ? +item.solar_azimuth_angle : 0)),
        },
      ],
    });
  }, [solarAngleDatas, state.heightConfig]);
  useEffect(() => {}, []);
  return (
    <div style={{ width: '100%', overflowY: 'auto' }}>
      <div style={{ width: '100%' }}>
        <div id="container" style={{ width: '100%', height: '400px' }}>
          {''}
        </div>
      </div>
      {/* <div className={styles.toggleBtnWrapper}>
        <div className={styles.toggleBtn}>查看24小时天气/空气质量预报</div>
      </div> */}
      <span className={`iconfont ${styles.iconBack}`} onClick={() => router.goBack()}>
        &#xe642;
      </span>
      {state.map && <NeBulaMap />}
      {state.heightConfig && (
        <div style={{ width: '100%' }}>
          <div id="container2" style={{ width: '100%', height: '400px' }}>
            {''}
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
