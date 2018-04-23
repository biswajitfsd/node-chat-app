const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

var message = {
  from: 'Biswajit',
  text: 'I am testing.'
};

var locationMessage = {
  from: 'Biswajit',
  latitude: 12.912203400000001,
  longitude: 77.64596379999999
};

describe('generateMessage', () => {
  it('It sould create correct message object', () => {
    var resMessage = generateMessage(message.from, message.text);
    expect(resMessage).toMatchObject(message);
    expect(resMessage.createdAt).toBeTruthy();
    expect(typeof resMessage.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('It sould create correct location message', () => {
    var resLocMessage = generateLocationMessage(locationMessage.from, locationMessage.latitude, locationMessage.longitude);
    expect(resLocMessage.createdAt).toBeTruthy();
    expect(typeof resLocMessage.createdAt).toBe('number');
    expect(resLocMessage.url).toBe(`https://www.google.com/maps?q=${locationMessage.latitude},${locationMessage.longitude}`);
    expect(resLocMessage.from).toBe(locationMessage.from);
  });
});
