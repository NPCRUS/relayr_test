'use strict'

/*
*  Modify this file as needed.
*/

const http = require('http');
const fs = require('fs');
const path = require('path');
const requestStats = require('request-stats');

process.on('SIGTERM', () => {
  fs.writeFileSync('./bandwith_stat.txt', "Bytes: " + sizeOfAll);
  process.exit(0);
})

const server = http.createServer((req, res) => {
  let body = []
  req.on('data', body.push.bind(body))
  req.on('end', () => {
    body = JSON.parse(Buffer.concat(body).toString());

    //some verification
    if(!Array.isArray(body))
    {
      process.stderr.write("incorrect request");
      return res.end();
    }

    if(body.length == 0)
    {
      process.stderr.write("request is empty");
      return res.end();
    }

    body.forEach((element) => {
      console.log(JSON.stringify(element));
    });

    //do not need to return anything since we don't wont excess bandwith
    res.end() 
  })
})

// It's my solution to measure bandwith
let stats = requestStats(server);
let sizeOfAll = 0;

stats.on('complete', (details) => {
    sizeOfAll += details.req.bytes + details.res.bytes;
});

server.listen(8080);
