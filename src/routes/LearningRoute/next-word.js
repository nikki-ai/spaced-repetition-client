import React, { Component } from 'react';
import learningContext from '../../contexts/learningContext';

class NextWordPage extends Component {
  static contextType = learningContext;
  render() {
    let {
      nextWord,
      totalScore,
      userResponse,
      wordCorrectCount,
      wordIncorrectCount,
      handleSubmitAnswer,
      handleChange,
    } = this.props;

    return (
      <div>
        <h2>Translate the word:</h2>
        <p>{nextWord}</p>
        <form onSubmit={handleSubmitAnswer}>
          <label htmlFor='answer-input'>
            What's the translation for this word?
          </label>
          <input
            name='answer'
            id='answer-input'
            type='text'
            placeholder='Translation'
            value={userResponse}
            onChange={handleChange}
            required
          />
          <button type='submit'>Submit your answer</button>
        </form>
        <p>Your total score is: {totalScore} </p>
        <p>You have answered this word correctly {wordCorrectCount} times.</p>
        <p>
          You have answered this word incorrectly {wordIncorrectCount} times.
        </p>
      </div>
    );
  }
}

export default NextWordPage;
