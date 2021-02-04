import React from 'react';
import styles from './ErrorBlock.module.css';

function ErrorBlock() {
  return (
    <div className={styles.errorBlock}>
      <h2>File format is not correct</h2>
    </div>
  );
}

export default ErrorBlock;
