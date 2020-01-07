import { login, logout } from '../../actions/auth';

describe('The Auth Action Generators', () => {
  it('should generate action for login', () => {
    const uid = 'JFoC918SiXUPaz7LsnLqjItUDBm2';
    const action = login(uid);
    expect(action).toEqual({
      type: 'LOGIN',
      uid
    });
  });

  it('should generate logout action', () => {
    const action = logout();
    expect(action).toEqual({
      type: 'LOGOUT'
    });
  });
});
