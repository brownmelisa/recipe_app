import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
export default function todo_init(root) {
  ReactDOM.render(<Todo />, root);
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
       return (
      <div>
        <h2>Tasks</h2>
             </div>
    );
  }
}
