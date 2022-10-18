// 概要
// 　現在時刻を表示する。
// 実行方法
// 　ターミナルにて「npm run displayTime」と投入する。

const moment = require('moment');

console.log(`課題「npm その③」`);
console.log(`現在の時刻は ${moment().format("YYYY-MM-DD HH:mm:ss")} です。`);
