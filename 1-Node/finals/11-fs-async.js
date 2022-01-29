const { readFile, writeFile } = require('fs');

console.log('------start-------');
readFile('./content/first.txt', 'utf-8', (err, result)=>{
    if(err){
        return null;
    }

    const first = result;
    readFile('./content/second.txt', 'utf-8', (err, result)=>{
        if(err){
            return null;
        }

        const second = result;
        writeFile('./content/result-async.txt', `Here is the result : ${first}, ${second}`, (err, result)=>{
            if(err){
                return null;
            }
            console.log('----------DONE WITH THIS TASK');
        })
    })
})
console.log('STARTING NEXT TASK');