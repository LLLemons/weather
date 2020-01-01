import React from 'react';
import styles from './content.css';
const Content: React.FC = props => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export default Content;
