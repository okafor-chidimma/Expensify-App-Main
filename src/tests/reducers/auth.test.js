import authReducer from '../../reducers/auth';

describe('Testing the Auth Reducer', () => {
  it('should login', () => {
    const uid = 'J1234';
    const action = {
      type: 'LOGIN',
      uid
    };
    const reducer = authReducer(undefined, action);
    expect(reducer.uid).toBe(uid);
    expect(reducer).toEqual({
      uid
    });
  });
  it('should logout', () => {
    const action = {
      type: 'LOGOUT'
    };
    const reducer = authReducer({ uid: '1234gfg' }, action);
    expect(reducer).toEqual({});
  });
});
