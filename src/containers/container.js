import { connect } from 'react-redux';
import SampleToDoList from '../components/SampleToDoList.js';
import { addToDo, toggleToDo } from '../actions/actions';

export const ToDoList = connect (
  // This maps the store to the props of our component
  // Here we pass the todolist in the store to our component
  function mapStateToProps(state) {
    return { todos: state }
  },
  function mapDispatchToProps(dispatch) {
    return {
      addToDo: text => dispatch(addToDo(text)),
      toggleToDo: id => dispatch(toggleToDo(id))
    };
  }
)(SampleToDoList); 

// One can visualise the above code as the following wrapper
// around SampleToDoList : 
// <TodoList todos={state}
// addTodo={text => dispatch(addTodo(text))}
// toggleTodo={id => dispatch(toggleTodo(id))} />