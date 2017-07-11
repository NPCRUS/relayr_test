const CustomQueue = require('../../sender/CustomQueue.js');

describe("CustomQueue: ",function()
{
    let queue;
    let jsonMock = {"deviceId":"9bde4d3e-dfc7-4b31-90bc-9032961793c0","readings":[{"path":"","meaning":"humidity","value":24.012}],"received":1479907316977};

    beforeEach(() => {
        queue = new CustomQueue();
    });

    afterEach(() => {
        queue.clearInterval();
        queue = undefined;
    });

    it("correct initialization", (done) => {
        expect(queue.buffer).toEqual([]);
        expect(queue.interval).toEqual(jasmine.any(Number));
        expect(typeof queue.setInterval).toBe("function");
        expect(typeof queue.push).toBe("function");
        expect(typeof queue.clearInterval).toBe("function");
        done();
    });

    it("push metod pushes element to buffer", (done) => {
        queue.push(jsonMock);
        expect(queue.buffer.length).toBe(1);
        expect(queue.buffer[0]).toEqual(jsonMock);
        done();
    });

    it("interval is defined after call setInterval", (done) => {
        queue.setInterval(() => {});
        expect(typeof queue.interval).toBe("object");
        done();
    });

    it("onIntervalCallback has been invoked if buffer is not empty", (done) => {
        queue.push(jsonMock);
        queue.setInterval(() => {
            done();
        });
    });

    it("cleatInterval function has been invoked if buffer is empty", (done) => {
        queue.clearInterval = () => {
            done();
        };

        queue.setInterval(() => {});
    });

    it("Buffer has been cleared after invoke onIntervalCallback", (done) => {
        queue.push(jsonMock);
        queue.setInterval(() => {
            setTimeout(() => {
                expect(queue.buffer.length).toBe(0);
                done();
            },500);
        })
    });
})