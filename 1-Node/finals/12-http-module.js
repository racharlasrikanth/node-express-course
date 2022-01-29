const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.end('Welcome to our home page');
    }
    if(req.url === '/about'){
        res.end('Here is our short history')
    }
    if(req.url === '/contact'){
        res.end("CONTACT PAGE")
    }
    res.end(`
        <h1>Opps! 404 Error!!!</h1>
        <p>Page Not Found!</p>
        <a href="/">Back to Home</a>
    `)
});

server.listen(5000);