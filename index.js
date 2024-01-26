/*
create port,
import http and httpStatus module,
create server instance 
*/
const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();

const responseMessage = {
    "/info" : "<h1>We are here to learn javaScript</h1>",
    "/contact" : "<h1>Come visit us in Durham, NC</h>",
    "/about" : "<h1>Learn More About Us</h1>",
    "/hello" : "<h1>Say hello by emailing us here</h1>",
    "/error" : "<h1>Sorry, the page you are looking for is not here</h1>"
};
app.on("request", (reqListner, resListner) => {
    var body = [];
    reqListner.on("data", (chk) => {
        body.push(chk)
    });
    reqListner.on("end", () => {
        strReqData = Buffer.concat(body).toString();
        console.log(`The Content body: ${strReqData}`);
    });
    resListner.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    if (responseMessage[reqListner.url]) {
        resListner.end(responseMessage[reqListner.url])
    } else {
        resListner.end("<h1>Home</h1>");
    }
});

app.listen(port);
console.log('The server has startd and is listening on port number: ${port}');

