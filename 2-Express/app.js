const http = require('http');
const {readFileSync} = require("fs");

const homePage = readFileSync("./sidebar-app/index.html");
const homeStyles = readFileSync("./sidebar-app/style.css");
const homeLogic = readFileSync("./sidebar-app/sidebar-app.js");
const homeImage = readFileSync("./sidebar-app/person1.jpg");

const server = http.createServer((request, response) => {
    console.log(request.url);
    const url = request.url;
    // home page
    if(url === "/"){
        response.writeHead(200, {'content-type': 'text/html'})
        response.write(homePage)
        response.end()
    }
    // styles page
    else if(url === "/style.css"){
        response.writeHead(200, {'content-type': 'text/css'})
        response.write(homeStyles)
        response.end()
    }
    // logic page
    else if(url === "/sidebar-app.js"){
        response.writeHead(200, {'content-type': 'text/javascript'})
        response.write(homeLogic)
        response.end()
    }
    // image page
    else if(url === "/person1.jpg"){
        response.writeHead(200, {'content-type': 'image/jpg'})
        response.write(homeImage)
        response.end()
    }
    // about page
    else if(url === "/about"){
        response.writeHead(200, { 'content-type':'text/html' })
        response.write('<h1>about page</h1>');
        response.end();
    }
    // resuourse not found
    else{
        response.writeHead(404, { 'content-type':'text/html' })
        response.write('<h1>PAGE NOT FOUND</h1>');
        response.end();
    }
})

server.listen(5000)