export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        currentUser: action.currentUser,
        requestId: action.requestId
      };
    case 'LOGOUT':
      return {
        uid: null,
        currentUser: null
      };
    case 'VERIFY':
      return {
        uid: action.uid,
      };
    case 'REFRESH_TOKEN':
      return {
        uid: action.uid,
      };
    default:
      return state;
  }
};
