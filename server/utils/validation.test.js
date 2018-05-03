const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('Should reject non string values', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
  });
  it('It should reject string with only spaces', () => {
    var res = isRealString('    ');
    expect(res).toBe(true);
  });
  it('Should allow string with non-space characters', () => {
    var res = isRealString('  biswajit  ');
    expect(res).toBe(true);
  });
});
