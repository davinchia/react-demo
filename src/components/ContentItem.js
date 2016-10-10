import React from 'react'

let ContentItem = React.createClass({
  render() {
    // console.log(this.props.toggle)
    return (
        <li> { this.props.description } <button onClick={this.deleteMe}> Done! </button> </li>
    );
  },

  deleteMe() {
    // console.log("Deleting myself");
    this.props.toggle(this.props.id);
  }
});

export default ContentItem;