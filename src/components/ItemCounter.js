import React from 'react';

let ItemCounter = React.createClass({
  render() {
    var display = "";
    if (this.props.count == 1) {
      display = "1 task remaining!";
    } else if (this.props.count > 1) {
      display = this.props.count + " tasks remaining!";
    } else {
      display = "There are no tasks!";
    }
    return (
      <div>
        {display}
      </div>
    );
  }
});  

export default ItemCounter;