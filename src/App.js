import React, { Component } from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer.js';
import { List, Map } from 'immutable';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import fetch from 'isomorphic-fetch';
import { ToDoList } from './containers/container.js';
import { fetchTasks } from './actions/actions.js'

require('es6-promise').polyfill();

// Uncomment to seed the store
// let first = Map({
//       id: 1,
//       isDone: false,
//       text: "Initial Task"
//     })
// let initial = List([first]);

const logger = createLogger({
    collapsed: true,
    stateTransformer: state => state.toJS()
  });
const store = createStore(reducer, applyMiddleware(thunk, promise, logger));

store.dispatch(fetchTasks())

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

