const expect = require('expect');

var {generateMessage} = require('./message.js');

var message = {
  from: 'Biswajit',
  text: 'I am testing.'
};

describe('generateMessage', () => {
  it('It sould create correct message object', () => {
    var resMessage = generateMessage(message.from, message.text);
    expect(resMessage).toMatchObject(message);
    expect(resMessage.createdAt).toBeTruthy();
    expect(typeof resMessage.createdAt).toBe('number');
  });
});
