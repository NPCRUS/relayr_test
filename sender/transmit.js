'use strict'

const request = require('request');

// First I decided to reduce amount of requests. For this purpose I've implemented my little setInterval logic overide)
// Actually this was reduced bandwith from 28200 to ~9000.
const CustomQueue = require('./CustomQueue.js');
let queue = new CustomQueue(1500);

/*
*  This function will be called for each event.  (eg: for each sensor reading)
*  Modify it as needed.
*/

module.exports = (eventMsg, encoding, callback) => {
  queue.push(eventMsg);
  callback();
}

queue.setInterval((buffer) => {
  request.post('http://localhost:8080/event', {json: true, body: buffer}, (err, res, body) => {});
});
