'use strict';

//I've separate this logic from transmit.js for better and more efficent testing

class CustomQueue {
    constructor(interval)
    {
        this.buffer = [];
        this.interval = interval || 1500;
    }

    push(item) {
        this.buffer.push(item);
    }

    setInterval(onIntervalCallback) {
        this.interval = setInterval(() => {

            if(this.buffer.length == 0)
            {
                this.clearInterval();
                return;
            }

            onIntervalCallback(this.buffer);
            this.buffer = [];

        },this.interval);
    }

    clearInterval() {
        clearInterval(this.interval);
    }
};

module.exports = CustomQueue;