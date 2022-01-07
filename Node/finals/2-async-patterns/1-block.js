const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.end('<h1>Home Page</h1>');
    }
    if(req.url === "/about"){
        // BLOCKING CODE !!!!
        for (let i = 0; i < 10000; i++) {
            for (let j = 0; j < 10000; j++) {
                console.log(`${i}${j}`);
            }
        }
        res.end(`<h1>About Page</h1>`);
    }
    res.end('<h1>404 Page Not Found</h1>')
})

server.listen(5000, ()=>{
    console.log('server is listening on port : 5000');
})