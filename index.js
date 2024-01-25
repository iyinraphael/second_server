/*
create port,
import http and httpStatus module,
create server instance 
*/
const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();

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

    let responseMessage = "<h1>This will show on the screen.</h1>";
    resListner.end(responseMessage);
});

app.listen(port);
console.log('The server has startd and is listening on port number: ${port}');

