export default function suggest (state = {}, action) {
  switch (action.type) {
    case 'STOCKS':
      return Object.assign({}, state, action.stocks);
    case 'TEMPS':
      return Object.assign({}, state, action.temps);
    default:
      return state;
  }
}
