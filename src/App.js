import React, { Component } from 'react';
let update = require('react-addons-update');

//Master component that everything else is based off
export default class App extends Component {
  render() {
    return (
      //note that the html returned in render needs to be wrapped in a div if it is just a single object
      //we can also pass properties into components from the parent and access them through this.props in the child component
      <div>
        <h1>Simple To-Do List</h1>
        <SampleToDoList prompt = "Some To-Dos" /> 
      </div>
    );
  }
}

//Our different components
let SampleToDoList = React.createClass({
  //React components come with native functions that allow one to better interact with the components
  //These are called in a predefined sequence
  //One of this is getInitialState, which allows us to set the initial state of a component
  //Note this is getInitialState is the first function called when a component is rendered
  getInitialState() {
    return {
      listOfItems: [
        { description: "Make sample app work." },
        { description: "Add functions to this demo." }
      ]
    }
  },

  render() {
    //Here the child component is rendering whatever that is passed to it
    //Notice that arrays of objects can also be passed to child components to be rendered; this avoids duplication
    //and is handy because responses are often is JSON objects
    //We access state using this.state
    let that = this;
    var count = 0;
    var listOfItems = this.state.listOfItems.map( 
        function(item) {
          return that.generateEachItem(item, count++, that.deleteItem);
        }
      );
    //React knows what to do with arrays of components.
    return (
      <div>
        <ul>
          <input type = 'text' onKeyPress = { this.handleKeyPress } />
          <p> {this.props.prompt} </p>
          { listOfItems }    
        </ul>
      </div>  
    );
  },

  //React requires each component in the array to have a key so that it can quickly recognise it in the virtualDOM it creates.
  generateEachItem(item, index, deleteItem) {
    return <ContentItem description = {item.description} key = {index} deleteItem={deleteItem}/>
  },

  //Similarly we can easily pass around functions to components to handle certain things. 
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log("Added a new to-do!");

      var item = {};
      item.description = e.target.value;

      //We want state to be immutable and so we use update from the react-addon library to modify it
      let newList = update(this.state.listOfItems, {$push: [item]});
      this.setState({ listOfItems: newList });

      e.target.value = "";
    }
  },

  //We can also pass functions to child components; this is an example of react's unidirectional flow.
  //Though this can be a hassle, it greatly simplifies thinking, and gives a nice framework to hang things on.
  deleteItem(index) {
    //We similarly use a splice helper to preserve immutability.
    console.log("Deleting a child item.");
    var newList = update(this.state.listOfItems, {$splice: [[index, 1]]});
    this.setState({ listOfItems: newList });
  }

});

let ContentItem = React.createClass({
  render() {
    return (
        <li> { this.props.description } <button onClick={this.deleteMe}> Done! </button> </li>
    );
  },

  deleteMe() {
    console.log("Deleting myself");
    this.props.deleteItem(this.props.key);
  }
});