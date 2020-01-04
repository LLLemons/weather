import React, { useEffect, useState } from 'react';
import { httpGet } from '../utils/RequestUtil/request';
import styles from './index.css';
import router from 'umi/router';

interface Props {}

const neBulaMap: React.FC<Props> = () => {
  const [rotate, setRotate] = useState(0);
  const [Map, setMap] = useState();
  const handleRotateLeft = () => {
    const newRotate = rotate - 45;
    setRotate(newRotate);
  };
  const handleRotateRight = () => {
    const newRotate = rotate + 45;
    console.log(newRotate);
    setRotate(newRotate);
  };
  useEffect(() => {
    console.log('in');
    httpGet(
      '/map/cloudmap',
      {},
      {
        responseType: 'blob',
      },
    ).then(res => {
      setMap(window.URL.createObjectURL(res.data));
    });
  }, []);
  return (
    <div>
      <div className={styles.imgWraper}>
        <img
          src={Map}
          alt="图片"
          className={styles.img}
          style={{
            transform: `rotate(${rotate}deg)`,
          }}
        ></img>
      </div>
      <div className={styles.control}>
        <span onClick={handleRotateLeft} className={`iconfont ${styles.icon} ${styles.left}`}>
          &#xe66b;
        </span>
        <span onClick={handleRotateRight} className={`iconfont ${styles.icon} ${styles.right}`}>
          &#xe66a;
        </span>
      </div>
      <span className={`iconfont ${styles.iconBack}`} onClick={() => router.goBack()}>
        &#xe642;
      </span>
    </div>
  );
};
export default neBulaMap;
