var moment = require('moment');

// 1st Jan 1970

// var date = moment();
// date.add(1, 'year').subtract(2, 'months');
// console.log(date.format('Do MMM YYYY'));

// MMM - short hand version of month like Sep
// YYYY - full year


var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var time = moment(1234);
console.log(time.format('h:mma'));
