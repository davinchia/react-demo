import { List, Map } from 'immutable';

const init = List([]);

// Reducer takes actions defined and returns new state to be stored in the store
export default function (todos=init, action) {
  switch(action.type) {
    
    case 'ADD_TODO':
      return todos.push(Map(action.payload));
    
    case 'TOGGLE_TODO':
      // Use map with anonymous function to find the task item
      console.log("here");
      return todos.map( t => {
        if (t.get('id') === action.payload) {
          console.log("update");
          return t.update('isDone', isDone => !isDone);
        } else {
          return t;
        }
      });

    default:
      return todos;
  }
}