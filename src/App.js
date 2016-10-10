import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer.js';
import { List, Map } from 'immutable';
import { ToDoList } from './containers/container.js';

import SampleToDoList from './components/SampleToDoList.js';

// Seed the store
let first = Map({
      id: 1,
      isDone: false,
      text: "Initial Task"
    })
let initial = List([first]);

const store = createStore(reducer, initial);

//Master component that everything else is based off
export default class App extends Component {
  render() {
    return (
      //note that the html returned in render needs to be wrapped in a div if it is just a single object
      //we can also pass properties into components from the parent and access them through this.props in the child component
      <div>
        <h1>Simple To-Do List</h1>
        <Provider store={store}>
          <ToDoList prompt="Some To-Dos" /> 
        </Provider>
      </div>
    );
  }
}

