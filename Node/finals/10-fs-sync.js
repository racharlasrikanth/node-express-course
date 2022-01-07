// const fs = require('fs');

const { readFileSync, writeFileSync } = require('fs');

console.log('---------srart---------');
const first = readFileSync('./content/first.txt', 'utf-8');
const second = readFileSync('./content/second.txt', 'utf-8');

console.log(first, second);

writeFileSync('./content/resultWriteSync.txt', `Here is the Result \n 1. ${first} \n 2. ${second} \n`, {flag: 'a'})

console.log('---------END WITH TASK---------');
console.log('srarting the next one')