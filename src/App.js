import React, { Component } from 'react';

//Master component that everything else is based off
export default class App extends Component {
  render() {
    return (
      //note that the html returned in render needs to be wrapped in a div if it is just a single object
      //we can also pass properties into components from the parent and access them through this.props in the child component
      <div>
        <h1>Hello, world! This is me testing hot loading!</h1>
        <TesterSearchBox prompt = "Search through me!" /> 
      </div>
    );
  }
}

//Our different components
let TesterSearchBox = React.createClass({
  //React components come with native functions that allow one to better interact with the components
  //These are called in a predefined sequence
  //One of this is getInitialState, which allows us to set the initial state of a component
  //Note this is getInitialState is the first function called when a component is rendered
  getInitialState() {
    return{
      listOfItems: [
        { itemName: 'Item 1', itemDescription: 'I am item 1.' },
        { itemName: 'Item 2', itemDescription: 'I am item 2.' },
        { itemName: 'Item 3', itemDescription: 'I am item 3.' }
      ]
    }
  },

  render() {
    //Here the child component is rendering whatever that is passed to it
    //Notice that arrays of objects can also be passed to child components to be rendered; this avoids duplication
    //and is handy because responses are often is JSON objects
    //We access state using this.state
    var listOfItems = this.state.listOfItems.map(
      function(item) {
        return <ContentItem itemName = {item.itemName} itemDescription = {item.itemDescription} />
      }
    )
    //React knows what to do with arrays of components.
    return (
      <ul>
        <h1> { this.props.prompt } </h1>
        { listOfItems }    
      </ul>
    );
  }
});

let ContentItem = React.createClass({
  render() {
    return (
        <li> { "My name is " + this.props.itemName +  " and I contain " + this.props.itemDescription } </li>
    );
  }
});