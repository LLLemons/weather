import React, { useContext, useState } from 'react';
import styles from './styles.css';
import { WeatherStore } from '../stores';
import { httpGet } from '../utils/RequestUtil/request';

const Cities = () => {
  const [height, setHeight] = useState('80vh');
  const { state, dispatch } = useContext(WeatherStore);
  const [searchValue, setValue] = useState('');
  const handleSearch = async () => {
    console.log(searchValue);
    const {
      data,
      success,
    } = await httpGet(`https://search.heweather.net/find?location=${searchValue}&key=d76970052e1f4508877835288aad26b9
    `);
  };
  return (
    <div className={styles.wrapper}>
      <div>
        {state.cities.map(item => (
          <div className={styles.citiesList} key={item}>
            <span className={styles.area}>{item}</span>
          </div>
        ))}
      </div>
      <div>
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
          <div className={styles.cancel}>取消</div>
        </div>
        <div>
          <div>
            <div className={styles.text}>北京</div>
            <div className={styles.text}>上海</div>
            <div className={styles.text}>广州</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cities;
