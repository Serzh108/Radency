import React from 'react';
import styles from './Table.module.css';

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

function Table({ state }) {
  return (
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
                      {/* {' ' + item.myErrors[index]} */}
                    </td>
                  ))}
                  <td>{item.duplicate && item.duplicate + 1}</td>
                </tr>
              ),
          )}
      </tbody>
    </table>
  );
}

export default Table;
