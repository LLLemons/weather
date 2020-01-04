import React, { useState, CSSProperties } from 'react';
import styles from './header.css';
import router from 'umi/router';

const Header: React.FC = props => {
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const handleToCities = () => {
    router.push({
      pathname: '/cities',
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
        &#xe600;
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
        <div
          className={styles.siderItem}
          onClick={() => {
            router.push({
              pathname: '/neBulaMap',
            });
            setMenuStyle({
              right: '-100%',
            });
          }}
        >
          星云图
        </div>
        <div className={styles.siderItem}>太阳高度角</div>
      </div>
    </div>
  );
};

export default Header;
