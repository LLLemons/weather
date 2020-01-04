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
      location: string;
    };
  };
}

const Detail: React.FC<Props> = props => {
  const { state, dispatch } = useContext<ContextProps>(WeatherStore);
  const [hourlyData, setHourlyData] = useState([]);
  useEffect(() => {
    httpGet('/weather/hourly', {
      location: props.location.query.location,
    }).then(res => {
      setHourlyData(res.data.HeWeather6[0].hourly);
    });
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
    </div>
  );
};
export default Detail;
