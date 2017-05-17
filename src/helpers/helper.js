const cstr2arr = (cstr) => cstr.split(',');

const ORDERS_PER_PAGE = 10;
const ITEMS_PER_PAGE = 10;
const MAX_NUM_PAGE = 5;
const pushUntilReachMaxOrNum = (max, num) => {
  let arr = [];
  let i = 0;

  while (i < max && arr.length < 5) {
    arr.push(i);
    i++;
  }
  return arr;
}

const pushUntilReachMinOrNum = (max, num) => {
  let arr = [];
  let i = max;

  while (arr.length < 5) {
    arr.push(i);
    i--;
  }

  return arr.reverse();
}

const pagination = (page, max) => {
  if (page === 0) {
    return pushUntilReachMaxOrNum(max, MAX_NUM_PAGE);
  } else if ( page === 1) {
    return pushUntilReachMaxOrNum(max, MAX_NUM_PAGE);
  } else if ( page === max - 1) {
    return pushUntilReachMinOrNum(max, MAX_NUM_PAGE);
  } else if ( page === max) {
    return pushUntilReachMinOrNum(max, MAX_NUM_PAGE);
  } else {
    return [page-2, page-1, page, page+1, page+2];
  }
}

const numberWithCommas = x => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

module.exports = {
  cstr2arr,
  ORDERS_PER_PAGE,
  ITEMS_PER_PAGE,
  pagination,
  numberWithCommas
}
