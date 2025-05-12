import express from "express";
import fs from "fs";
import compression from "compression";

const BASE_URL = "/";
const INDEX_HTML = fs.readFileSync("./dist/index.html").toString("utf-8");


function ts(){
    return new Date().toISOString();
}

function logRequest(req, res, next){
    console.log(ts(), req.method, req.originalUrl, req.ip);
    next();
}

function redirectToBase(req, res){
    res.status(200);
    res.set("Content-Type", "text/html");
    res.send(INDEX_HTML);
}

const server = express();

server.enable("trust proxy");
// server.use(compression());
server.use(BASE_URL, logRequest, express.static("./dist", { fallthrough: true}), redirectToBase);

const httpServer = server.listen(process.env.PORT || 8080, () => {
    console.log(ts(), "STARTED");
});

process.once("SIGINT", () => {
    httpServer.close(()=>{
        console.log(ts(), "STOPPED");
    });
});