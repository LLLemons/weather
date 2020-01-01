import React, { useReducer } from 'react';
import styles from './index.css';
import Header from './components/Header';
import Content from './components/Content';
import { reducer, init, WeatherStore } from '@/pages/stores';

const BasicLayout: React.FC = props => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      cities: [],
    },
    init,
  );
  return (
    <WeatherStore.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className={styles.wrapper}>
        <Header />
        <Content>{props.children}</Content>
      </div>
    </WeatherStore.Provider>
  );
};

export default BasicLayout;
