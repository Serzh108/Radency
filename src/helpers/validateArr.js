const statesToSort = {
  alabama: 'AL',
  michigan: 'MI',
  nevada: 'NV',
  california: 'CA',
  Florida: 'FL',
};

const emptyCell = a => {
  if (a.length === 0) {
    throw new SyntaxError('Missing critical data!');
  }
};

// Full Name
const firstColumn = el => {
  // console.log('firstColumn = ', el);
  emptyCell(el);
};

// Phone
const secondColumn = (el, index, rowArr) => {
  emptyCell(el);
  if (el.length > 12 || el.length < 10) {
    return true;
  }
  if (el.length === 12 && (el[0] !== '+' || el[1] !== '1')) {
    return true;
  }
  if (el.length === 11 && el[0] === '1') {
    rowArr[index] = '+' + el;
  }
  if (el.length === 10) {
    rowArr[index] = '+1' + el;
  }
};

// Email
const thirdColumn = (el, index, rowArr) => {
  console.log(`rowArr #${index} : `, rowArr);
  // if (el.length === 0) {
  //   throw new SyntaxError('Missing critical data!');
  // }
  emptyCell(el);
};

// Age
const fourthColumn = el => {
  if (el % 1 !== 0) {
    return true;
  }
  if (+el < 21) {
    return true;
  }
};

// Experience
const fifthColumn = (el, index, rowArr) => {
  if (+el > rowArr[index - 1] - 21 || +el < 0) {
    return true;
  }
};

// Yearly Income
const sixthColumn = el => {
  // const twoSignAfterDot = el.slice(el.indexOf('.') + 1).length !== 2;
  if (el % 1 !== 0) {
    if (el.slice(el.indexOf('.') + 1).length !== 2) {
      return true;
    }
  }
  if (+el > 1000000 || +el < 0) {
    return true;
  }
};

// Has children
const seventhColumn = (el, index, rowArr) => {
  if (
    el.toLowerCase() !== 'true' &&
    el.toLowerCase() !== 'false' &&
    el !== ''
  ) {
    return true;
  }
};

// License states
const eighthColumn = (el, index, rowArr) => {
  const elArr = el.split(',');

  if (elArr.length === 1 && el.length > 2) {
    rowArr[index] = statesToSort[el.toLowerCase()];
  }

  if (elArr.length > 1) {
    elArr.forEach((item, idx, arr) => {
      if (item.trim().length > 2) {
        arr[idx] = statesToSort[item.toLowerCase().trim()];
      } else {
        arr[idx] = item.trim();
      }
    });
    rowArr[index] = elArr.join('|');
  }
};

// Expiration date
const ninthColumn = el => {
  const CurrentDate = new Date();
  const ourDate = new Date(el);
  // console.log('ninthColumn = ', el);
  if (ourDate < CurrentDate) {
    return true;
  }

  if (!/\d{4}-\d{2}-\d{2}/.test(el) && !/\d{2}\/\d{2}\/\d{4}/.test(el)) {
    return true;
  }
};

// License number
const tenthColumn = (el, index, rowArr) => {
  if (el.length !== 6 || /\W|_/.test(el)) {
    return true;
  }
  // if (/\W/.test(el)) {
  //   return true;
  // }
};

const validateAr = [
  firstColumn,
  secondColumn,
  thirdColumn,
  fourthColumn,
  fifthColumn,
  sixthColumn,
  seventhColumn,
  eighthColumn,
  ninthColumn,
  tenthColumn,
];

export default validateAr;
