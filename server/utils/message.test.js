var {generatedMessage} = require('./message');

describe('generateMessage', () => { 
    test('should generate correct message object', () => {
        var from = 'seawkerboon@example.com';
        var text = 'Hello, this is a test';
        var message = generatedMessage(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    })
});