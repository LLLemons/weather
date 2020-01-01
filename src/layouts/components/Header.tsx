import React from 'react';
import styles from './header.css';
import router from 'umi/router';

const Header: React.FC = props => {
  const handleToCities = () => {
    router.push({
      pathname: '/cities',
    });
  };
  return (
    <div className={styles.header}>
      <span className={styles.main}>weather</span>
      <span className={styles.list} onClick={handleToCities}>
        城市列表
      </span>
    </div>
  );
};

export default Header;
