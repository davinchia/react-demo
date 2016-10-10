import { List, Map, fromJS } from 'immutable';

// const init = List([]); 
const init = Map({
    'fetched': false,
    'todos': List([])
  }); 

// Reducer takes actions defined and returns new state to be stored in the store
export default function (store=init, action) {
  // console.log(store.get('todos'));
  switch(action.type) {
    case 'ADD_TODO':
      return store.set('todos', store.get('todos').push(Map(action.payload)));
    
    case 'TOGGLE_TODO':
      // Use map with anonymous function to find the task item
      let todos = store.get('todos');
      let newTodos = todos.map( t => {
        if (t.get('id') === action.payload) {
          return t.update('isDone', isDone => !isDone);
        } else {
          return t;
        }
      });
      // console.log(action.payload);
      // console.log("here");
      // console.log(newTodos);
      return store.set('todos', newTodos);

    case 'RECEIVED_TASKS':
      return store.set('todos', fromJS(action.payload.todos)).set('fetched', true);

    default:
      return store;
  }
}