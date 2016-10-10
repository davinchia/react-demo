import React from 'react';
import { List, Map } from 'immutable';
import ContentItem from './ContentItem.js';
import ItemCounter from './ItemCounter.js';


//Our master componenet
let SampleToDoList = React.createClass({
  render() {
    //Here the child component is rendering whatever that is passed to it
    //Notice that arrays of objects can also be passed to child components to be rendered; this avoids duplication
    //and is handy because responses are often is JSON objects
    //We access state using this.state
    let that = this;
    // console.log(this.props.todos)
    var listOfItems;
    if (!this.props.fetched) {
      listOfItems = "Fetching tasks..";
    } else {
      listOfItems = this.props.todos.map( 
        function(item) {
          if (!item.get('isDone')) {
            return that.generateEachItem(item, item.get('id'), that.deleteItem);
          }
        }
      );
    }
    //React knows what to do with arrays of components.
    return (
      <div>
      <ItemCounter count = {this.props.todos.size}/>
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
    return <ContentItem description = { item.get('text') } key = { index } id = { index } toggle = { this.props.toggleToDo }/>
  },

  //Similarly we can easily pass around functions to components to handle certain things. 
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.addToDo(e.target.value); //we have now called our action
      e.target.value = "";
    }
  },
});

export default SampleToDoList;