import React from 'react';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Parser from './components/Parser/Parser0';
import Parser1 from './components/Parser/Parser';
import './App.css';

function App() {
  // const submitForm = () => {
  //   console.log('File loaded!');
  // };

  return (
    <div className="App">
      <header className="App-header">
        <p>Radency - test task.</p>
      </header>
      {/* <Form />
      <Table /> */}
      <Parser1 />
    </div>
  );
}

export default App;
