const os = require('os');

// info about current user
const user = os.userInfo();
console.log(os.uptime());

// method returns system uptime in seconds
console.log(`the system uptime is : ${os.uptime() / 60} hours`);

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
}
console.log(currentOS);