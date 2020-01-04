import React, { useContext, useState } from 'react';
import styles from './styles.css';
import { WeatherStore } from '../stores';
import { httpGet } from '../utils/RequestUtil/request';
import router from 'umi/router';

const Cities = () => {
  const [height, setHeight] = useState(0);
  const { state, dispatch } = useContext(WeatherStore);
  const [searchValue, setValue] = useState('');
  const [cityList, setCityList] = useState([]);
  const handleSearch = async () => {
    console.log(searchValue);
    const {
      data,
      success,
    } = await httpGet(`https://search.heweather.net/find?location=${searchValue}&key=d76970052e1f4508877835288aad26b9
    `);
    if (success) {
      setCityList(data.HeWeather6[0].basic);
    }
  };
  const handleSelectCity = item => () => {
    dispatch({
      type: 'add',
      payload: {
        location: item.location,
        cid: item.cid,
        lat: item.lat,
        lon: item.lon,
        tz: item.tz,
      },
    });
    setHeight(0);
  };
  const handleDelete = index => () => {
    dispatch({
      type: 'delete',
      payload: index,
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.cityHeader}>
        <span className={`iconfont ${styles.iconBack}`} onClick={() => router.goBack()}>
          &#xe642;
        </span>
        <div className={styles.headerMain}>城市列表</div>
      </div>
      <div>
        {state.cities.map((item, index) => (
          <div
            className={styles.citiesList}
            key={item.cid}
            onClick={() => {
              router.push({
                pathname: '/',
                query: {
                  index,
                },
              });
            }}
          >
            <span className={styles.area}>{item.location}</span>
            <span onClick={handleDelete(index)} className={`iconfont ${styles.deleteIcon}`}>
              &#xe6ce;
            </span>
          </div>
        ))}
      </div>
      <div className={styles.addWrapper}>
        <span className={styles.add} onClick={() => setHeight('80vh')}>
          +
        </span>
      </div>
      <div className={styles.zone} style={{ height: height }}>
        <div className={styles.searchArea}>
          <input className={styles.input} onChange={e => setValue(e.target.value)} />
          <div className={styles.search} onClick={handleSearch}>
            搜索
          </div>
          <div className={styles.cancel} onClick={() => setHeight(0)}>
            取消
          </div>
        </div>
        <div>
          <div>
            {cityList.length ? (
              <>
                {cityList.map(item => (
                  <div className={styles.text} onClick={handleSelectCity(item)}>
                    {item.location}
                  </div>
                ))}
              </>
            ) : (
              <div className={styles.text}>暂无数据</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cities;
