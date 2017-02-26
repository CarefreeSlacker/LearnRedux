var redux = require('redux');
var axios = require('axios');

var stateDefault = {
    searchText: '',
    showCompleted: false,
    todos: [],
    map: {
        isFetching: false,
        url: undefined
    }
}


// searchText stuff
var searchTextReducer = (state = 'Anonymous', action) => {
    switch(action.type){
        case 'CHANGE_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
}

var changeSearchText = (searchText) => {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        searchText: searchText
    }
}


// todos stuff
var nextTodoItemId = 1;
var todosReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: nextTodoItemId++,
                    name: action.todo
                }
            ]
        case 'REMOVE_TODO':
            return state.filter((element) => element.id !== action.id)
        default:
            return state;
    }
}

var addTodo = (todo) => {
    return { type: 'ADD_TODO', todo: todo }
}

var removeTodo = (todoId) => {
    return { type: 'REMOVE_TODO', id: todoId }
}

// showCompleted stuff
var showCompletedReducer = (state = false, action) => {
    switch(action.type){
        default:
            return state
    }
}

// map stuff
var mapReducer = (state = { isFetching: false, url: undefined }, action) => {
    switch(action.type){
        case 'START_FETCHING_LOCATION':
            return {
                isFetching: true,
                url: undefined
            }
        case 'END_FETCHING_LOCATION':
            return {
                isFetching: false,
                url: action.url
            }
        default:
            return state
    }
}

var startFetchingLocation = () => {
    return { type: 'START_FETCHING_LOCATION' }
};
var endFetchingLocation = (givenUrl) => {
    return { type: 'END_FETCHING_LOCATION', url: givenUrl }
};

var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    map: mapReducer
})

var store = redux.createStore(reducer, stateDefault);

var unsubscribe = store.subscribe(() => {
    var state = store.getState();

    document.getElementById('app').innerHTML = 'Loading';

    if (state.map.isFetching) {
        document.getElementById('app').innerHTML = 'Loading';
    } else if (state.map.url) {
        document.getElementById('app').innerHTML = '<a target="_blank" href="' + state.map.url + '">Look at your location</a>';
    } else {
        document.getElementById('app').innerHTML = 'Попал в просак';
    }
});

var fetchLocationData = () => {
    store.dispatch(startFetchingLocation());

    axios.get('http://ipinfo.io/json').then(function(response) {
        var location = response.data.loc;
        var baseURL = 'http://maps.google.ru?q=';

        store.dispatch(endFetchingLocation(baseURL + location));
        return true;
    })
}

var currentState = store.getState();

fetchLocationData(store, 'http://ipinfo.io');

store.dispatch(changeSearchText('AnotherText'));

store.dispatch(addTodo('Collectioning'));

store.dispatch(changeSearchText('ElseAnotherText'));

store.dispatch(addTodo('Playing computer games'));

store.dispatch(removeTodo(2));
