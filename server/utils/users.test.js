const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Janet',
                room: 'Angular Course'
            },
            {
                id: '3',
                name: 'Alicia',
                room: 'Node Course'
            }
        ];
    });

    test('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Vern',
            room: 'The Office Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toMatchObject([user]);
    });

    test('should return names for nodes course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toMatchObject(['Mike', 'Alicia'])
    });

    test('should return names for angular course', () => {
        var userList = users.getUserList('Angular Course');

        expect(userList).toMatchObject(['Janet'])
    });

    test('should remove a user', () => {
        var user = users.removeUser('2');

        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    test('should not remove a user', () => {
        var user = users.removeUser('35');

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    test('should find a user', () => {
        var user = users.getUser('3');

        expect(user).toMatchObject(users.users[2]);
    });

    test('should not find a user', () => {
        var user = users.getUser('35');

        expect(user).toBeFalsy();
    });
});