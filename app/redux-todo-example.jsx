var redux = require('redux');

console.log("Redux is coming");

var stateDefault = {
    searchText: '',
    shomCompleted: false,
    todos: []
}

var reducer = (state = stateDefault, action) => {
    return state;
}

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('current state ', currentState);
