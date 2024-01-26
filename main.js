// set up port, 
const port = 3000;
http = require("http"),
httpStatus = require("http-status-codes"),
app = http.createServer();

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
}

const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us here</h1>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
}

app.on("request", (req, res) => {
    var body = [];
    req.on("data", (bodyData) => {
        body.push(bodyData);
    });
    req.on("end", () => {
        strBody = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${strBody}`);
    });

    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);

    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    if (routeResponseMap[req.url]) {
        setTimeout(() => res.end(routeResponseMap[req.url]), 2000);
    } else {
        res.end("<h1>GO do pick ups</h1>");
    }
});

app.listen(port);
console.log('The server has startd and is listening on port number: ${port}');