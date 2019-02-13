var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => { 
    test('should generate correct message object', () => {
        var from = 'seawkerboon@example.com';
        var text = 'Hello, this is a test';
        var message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});

test('should generate correct location message object', () => {
    var from = 'seawkerboon@example.com';
    var latitude = 15;
    var longtitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var locationMessage = generateLocationMessage(from, latitude, longtitude);

    expect(locationMessage).toMatchObject({from, url});
    expect(typeof locationMessage.createdAt).toBe('number');
});