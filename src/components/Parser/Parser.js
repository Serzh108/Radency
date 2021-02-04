import React, { useState } from 'react';
import { CSVReader } from 'react-papaparse';
import styles from './Parser.module.css';
import validateAr from '../../helpers/validateArr';

const buttonRef = React.createRef();

function CSVReader1() {
  const [state, setState] = useState([]);
  const [criticalError, setCriticalError] = useState(false);

  const tableHead = () => {
    return (
      <tr>
        <th>ID</th>
        <th>Full Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Age</th>
        <th>Experience</th>
        <th>Yearly Income</th>
        <th>Has children</th>
        <th>License states</th>
        <th>Expiration date</th>
        <th>License number</th>
        <th>Duplicate with</th>
      </tr>
    );
  };

  // const firstFunc = (a, b) => {
  //   console.log('firstFunc = ', a + b);
  // };
  // const secondFunc = (a, b) => {
  //   console.log('secondFunc = ', a * b);
  // };
  // const thirdFunc = (a, b) => {
  //   console.log('thirdFunc = ', a - b);
  // };

  // const validateAr = [firstFunc, secondFunc, thirdFunc];
  validateAr[0](5, 7);
  validateAr[1](5, 7);
  validateAr[2](5, 3);

  // testAr.forEach((item, idx, newAr) => {
  //   newAr[idx] = item + 1;
  //   console.log('item = ', item);
  // });
  // console.log('!!!testAr = ', testAr);

  const validateData = data => {
    console.log('validateData', data[0].data);
    console.log('Phone: ', data[0].data[1]);
    data &&
      data.forEach((item, idx, newAr) => {
        const subAr =
          item.data.length > 1
            ? item.data.map((el, index, rowArr) => {
                // !!! TEMP
                // console.log(`el- ${idx}-${index} : `, el);

                try {
                  if (validateAr[index](el, index, rowArr, newAr)) return false;
                } catch (error) {
                  console.log('error', error.message);
                  setCriticalError(true);
                }
                return el.length > 12 ? false : true;
              })
            : [];
        console.log('subAr', subAr);
        newAr[idx].myErrors = subAr;
      });
    console.log('!!!  newAr = ', data);
    // ----------------------
    data &&
      data.forEach((item, idx, newAr) => {
        // console.log('item data.length: ', item.data.length);
        console.log(
          ` --- item idx: ${idx}, Phone: ${item.data[1]}, Email: ${item.data[2]}`,
        );
        const currentPhone = item.data[1];
        let duplicatePhoneIndex = null;
        const currentEmail = item.data[2];
        let duplicateEmailIndex = null;
        newAr.forEach((arr, i) => {
          if (currentPhone === arr.data[1] && i !== idx) {
            duplicatePhoneIndex =
              duplicatePhoneIndex !== null ? duplicatePhoneIndex : i;
            console.log('!!! Match Phone ID: ', i);
          }
          if (currentEmail === arr.data[2] && i !== idx) {
            duplicateEmailIndex =
              duplicateEmailIndex !== null ? duplicateEmailIndex : i;
            console.log('!!! Match Email ID: ', i);
          }
        });
        console.log('duplicatePhoneIndex =', duplicatePhoneIndex);
        console.log('duplicateEmailIndex =', duplicateEmailIndex);
        let lessIndex;
        if (duplicatePhoneIndex !== null && duplicateEmailIndex !== null) {
          if (duplicatePhoneIndex < duplicateEmailIndex) {
            lessIndex = duplicatePhoneIndex;
            newAr[idx].myErrors[1] = false;
          } else {
            lessIndex = duplicateEmailIndex;
            newAr[idx].myErrors[2] = false;
          }
        }
        if (duplicatePhoneIndex !== null && duplicateEmailIndex === null) {
          lessIndex = duplicatePhoneIndex;
          newAr[idx].myErrors[1] = false;
        }
        if (duplicatePhoneIndex === null && duplicateEmailIndex !== null) {
          lessIndex = duplicateEmailIndex;
          newAr[idx].myErrors[2] = false;
        }

        console.log('Less Index =', lessIndex);
        newAr[idx].duplicate = lessIndex;
        console.log(`newAr[${idx}].myErrors[1] = `, newAr[idx].myErrors[1]);
      });
    // ----------------------
  };

  const handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = data => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
    setCriticalError(false);
    validateData(data);
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

  const handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  return (
    <>
      {/* <h5>Basic Upload #1</h5> */}
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
        style={{
          heigth: 90,
        }}
      >
        {({ file }) => (
          <aside
            className={styles.aside}
            // style={{
            //   display: 'flex',
            //   flexDirection: 'row',
            //   marginBottom: 24,
            // }}
          >
            <button
              type="button"
              onClick={handleOpenDialog}
              className={styles.btn}
            >
              Import users
            </button>
            <div className={styles.fileName}>{file && file.name}</div>
            {/* <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20,
              }}
              onClick={handleRemoveFile}
            >
              Remove
            </button> */}
          </aside>
        )}
      </CSVReader>
      {criticalError ? (
        <div className={styles.errorBlock}>
          <h2>File format is not correct</h2>
        </div>
      ) : (
        <table>
          <tbody>
            {tableHead()}
            {state.length > 0 &&
              state.map(
                (item, idx) =>
                  item.data.length > 1 && (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      {item.data.map((el, index) => (
                        <td
                          key={index}
                          className={
                            !item.myErrors[index] ? styles.wrongData : null
                          }
                        >
                          {el.trim()}
                          {' ' + item.myErrors[index]}
                        </td>
                      ))}
                      <td>{item.duplicate && item.duplicate + 1}</td>
                    </tr>
                  ),
              )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CSVReader1;
