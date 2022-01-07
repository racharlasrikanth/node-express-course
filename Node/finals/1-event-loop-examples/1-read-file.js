const { readFile } = require('fs');

console.log('started a first task');

// check file path
readFile('./content/first.txt', 'utf-8', (err, result)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
    console.log('complated first task');
})
console.log('starting next task');