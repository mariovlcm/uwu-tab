/*import { createServer } from "http";
import { join, normalize, dirname, parse } from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".doc": "application/msword",
  ".eot": "application/vnd.ms-fontobject",
  ".ttf": "application/x-font-ttf",
};
// https://adrianmejia.com/building-a-node-js-static-file-server-files-over-http-using-es6/
createServer((req, res) => {
  let reqColor;
  switch (req.statusCode) {
    case 200:
      reqColor = "\x1b[32m";
      break;
    default:
      reqColor = "\x1b[31m";
  }
  console.log(reqColor, `${req.method} ${req.url}`);

  const parsedUrl = new URL(req.url, `http://${req.headers.host}/`);

  const sanitizePath = normalize(parsedUrl.pathname).replace(
    /^(\.\.[\/\\])+/,
    ""
  );
  let pathname = join(__dirname, sanitizePath);

  fs.stat(pathname, function (exist) {
    if (!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += "/index.html";
    }

    // read file from file system
    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader("Content-type", mimeType[ext] || "text/plain");
        res.end(data);
      }
    });
  });
}).listen(parseInt(process.argv[2]) || 8080);
*/

const http = require("http");
const fs = require("fs");
const path = require("path");
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 8080;
const hostname = process.argv[3] || "127.0.0.1";

const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".doc": "application/msword",
  ".eot": "application/vnd.ms-fontobject",
  ".ttf": "application/x-font-ttf",
};
let status = 200;
const server = http.createServer(function (req, res) {
  // parse URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}/`);

  const sanitizePath = path
    .normalize(parsedUrl.pathname)
    .replace(/^(\.\.[\/\\])+/, "");
  let pathname = path.join(__dirname, "../dist/", sanitizePath);

  fs.stat(pathname, function (err, stats) {
    if (err) {
      // if the file is not found, return 404
      res.statusCode = 404;
      status = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory, then look for index.html
    if (stats.isDirectory()) {
      pathname += "/index.html";
    }

    // read file from file system
    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500;
        status = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader("Content-type", mimeType[ext] || "text/plain");
        res.statusCode = 200;
        status = 200;
        res.end(data);
      }
    });
  });
  let resColor;

  switch (status) {
    case 200:
      resColor = "\x1b[32m";
      break;
    default:
      resColor = "\x1b[31m";
  }

  console.log(`${resColor} ${status}: ${req.method} ${req.url}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
