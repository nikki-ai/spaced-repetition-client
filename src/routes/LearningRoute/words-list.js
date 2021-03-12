import React, { Component } from 'react';

class WordsList extends Component {
  render() {
    return (
      <li>
        <h4>{this.props.word}</h4>
        <p>correct answer count: {this.props.count}</p>
        <p>incorrect answer count: {this.props.incorrectCount}</p>
      </li>
    );
  }
}

export default WordsList;
