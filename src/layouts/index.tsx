import React, { useReducer } from 'react';
import styles from './index.css';
import Header from './components/Header';
import Content from './components/Content';
import { reducer, init, WeatherStore } from '@/pages/stores';

const BasicLayout: React.FC = props => {
  const pathname = props.location.pathname;
  const [state, dispatch] = useReducer(
    reducer,
    {
      cities: [],
    },
    init,
  );
  let layout = null;
  console.log(pathname);
  if (pathname === '/cities') {
    layout = (
      <div className={styles.wrapper}>
        <Content>{props.children}</Content>
      </div>
    );
  } else {
    layout = (
      <div className={styles.wrapper}>
        <Header />
        <Content>{props.children}</Content>
      </div>
    );
  }
  return (
    <WeatherStore.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {layout}
    </WeatherStore.Provider>
  );
};

export default BasicLayout;
