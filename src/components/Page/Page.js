import React, { useState } from 'react';
import { CSVReader } from 'react-papaparse';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Table from '../Table/Table';
import validateData from '../../helpers/validateData';
import styles from './Page.module.css';

const buttonRef = React.createRef();

function Page() {
  const [state, setState] = useState([]);
  const [criticalError, setCriticalError] = useState(false);

  const handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = data => {
    // console.log('---------------------------');
    // console.log(data);
    // console.log('---------------------------');
    setCriticalError(false);
    validateData(data, setCriticalError);
    setState(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  const handleOnRemoveFile = data => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  return (
    <>
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }) => (
          <aside className={styles.aside}>
            <button
              type="button"
              onClick={handleOpenDialog}
              className={styles.btn}
            >
              Import users
            </button>
            <div className={styles.fileName}>{file && file.name}</div>
          </aside>
        )}
      </CSVReader>
      {criticalError ? <ErrorBlock /> : <Table state={state} />}
    </>
  );
}

export default Page;
