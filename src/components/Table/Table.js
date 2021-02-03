import React from 'react';
import styles from './Table.module.css';

function Table() {
  return (
    <table>
      <tbody>
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
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
