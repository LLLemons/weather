import React, { useState, CSSProperties, useContext } from 'react';
import styles from './header.css';
import router from 'umi/router';
import { WeatherStore, StateProps, ReducerProps, ContextProps } from '@/pages/stores';

const Header: React.FC = props => {
  const { state, dispatch } = useContext<ContextProps>(WeatherStore);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const handleToCities = () => {
    router.push({
      pathname: '/cities',
    });
  };
  const handleToggle = (type: string) => () => {
    dispatch({
      type: 'toggleShow',
      payload: type,
    });
  };
  return (
    <div className={styles.header}>
      <span className={styles.main}>weather</span>
      {/* <span className={styles.list} onClick={handleToCities}>
        城市列表
      </span> */}
      <span
        className={`iconfont ${styles.iconList}`}
        onClick={() => {
          setMenuStyle({
            right: 0,
          });
        }}
      >
        &#xe611;
      </span>
      <div className={styles.sider} style={menuStyle}>
        <span
          className={`iconfont ${styles.siderIconClose}`}
          onClick={() => {
            setMenuStyle({
              right: '-100%',
            });
          }}
        >
          &#xe608;
        </span>
        <div className={styles.siderItem} onClick={handleToCities}>
          城市列表
        </div>
        <div className={styles.siderItem}>
          空气质量{' '}
          <span
            className={`${styles.iconSwitch} ${state.airQulity ? styles.show : styles.unShow}`}
            onClick={handleToggle('airQulity')}
          />
        </div>
        <div className={styles.siderItem}>
          星云图{' '}
          <span
            className={`${styles.iconSwitch} ${state.map ? styles.show : styles.unShow}`}
            onClick={handleToggle('map')}
          />
        </div>
        <div className={styles.siderItem}>
          太阳高度角{' '}
          <span
            className={`${styles.iconSwitch} ${state.heightConfig ? styles.show : styles.unShow}`}
            onClick={handleToggle('heightConfig')}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
