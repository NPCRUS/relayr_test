const spawn = require('child_process').spawn;
const request = require('request');

describe("Receiver: ", () =>
{
    let receiver = spawn('node.exe', ['../receiver/index.js']);
    let jsonMock = {"deviceId":"9bde4d3e-dfc7-4b31-90bc-9032961793c0","readings":[{"path":"","meaning":"humidity","value":24.012}],"received":1479907316977};
    let lastMessage = '';

    receiver.stdout.on("data",function(buffer) { 
        lastMessage = String(buffer);
    });

    receiver.stderr.on("data",function(buffer) { 
        lastMessage = String(buffer);
    });

    afterAll(() => {
        receiver.kill('SIGINT');
    });

    it("is accepting requests", (done) => {
        request.post('http://localhost:8080/event', {json: true, body: []}, (err, res, body) => {
            expect(err).toBe(null);
            done();
        });
    });

    it("write error in stderr if parsed request is not Array", (done) => {
        request.post('http://localhost:8080/event', {json: true, body: {}} , (err, res, body) => {
            expect(lastMessage).toBe("incorrect request");
            done();
        });
    });

    it("write errors in stderr if parsed request is Array but it is empty", (done) => {
        request.post('http://localhost:8080/event', {json: true, body: []} , (err, res, body) => {
            expect(lastMessage).toBe("request is empty");
            done();
        });
    });

    it("write supplied json object in console", (done) => {
        request.post('http://localhost:8080/event', {json: true, body: [jsonMock]} , (err, res, body) => {
            expect(JSON.parse(lastMessage)).toEqual(jsonMock);
            done();
        });
    });
})