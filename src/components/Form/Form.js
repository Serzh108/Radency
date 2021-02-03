import React from 'react';
import styles from './Form.module.css';

function Form() {
  const fileLoad = evt => {
    evt.preventDefault();
    const files = evt.target.files;
    const selectedFile = files[0];
    console.log('File loaded name: ', selectedFile.name);

    const reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function () {
      console.log('Result: ', reader.result);
    };

    reader.onerror = function () {
      console.log('Error: ', reader.error);
    };
  };

  const submitForm = e => {
    e.preventDefault();
    console.log('File loaded!');
  };

  return (
    <form onSubmit={submitForm} className={styles.form}>
      <input type="file" onChange={fileLoad} />
      {/* <button type="submit" title="Load">
        Load
      </button> */}
    </form>
  );
}

export default Form;
