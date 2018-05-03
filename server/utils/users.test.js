const expect = require('expect');
var {Users} = require('./users');

describe('Users' , () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Biswajit Patra',
      room: 'Office sucs'
    }, {
      id: '2',
      name: 'Jone Doe',
      room: 'Office sucs'
    }, {
      id: '3',
      name: 'Lorem Wipsom',
      room: 'Office rool'
    }];
  });
  it('Should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Biswajit',
      room: 'Bakwas'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });
  it('Should remove user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it('Should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  it('Should find user', () => {
    var user = users.getUser('2');
    expect(user).toEqual(users.users[1]);
  });
  it('Should not find user', () => {
    var user = users.getUser('6');
    expect(user).toBe(undefined);
  });
  it('Should return name for Office sucs', () => {
    var userList = users.getUserList('Office sucs');
    expect(userList).toEqual(['Biswajit Patra', 'Jone Doe']);
  });
  it('Should return name for Office rool', () => {
    var userList = users.getUserList('Office rool');
    expect(userList).toEqual(['Lorem Wipsom']);
  });
});
