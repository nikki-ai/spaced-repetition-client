import React, { Component } from 'react';

class FeedbackPage extends Component {
  render() {
    let {
      guess,
      answer,
      totalScore,
      previousCorrectCount,
      previousIncorrectCount,
      isCorrect,
      previousWord,
      handleNextWord,
    } = this.props;
    let newCorrect = previousCorrectCount;
    let newIncorrect = previousIncorrectCount;
    isCorrect === true ? (newCorrect += 1) : (newIncorrect += 1);
    return (
      <div>
        <h2>
          {isCorrect
            ? 'You were correct! :D'
            : 'Good try, but not quite right :('}
        </h2>
        <span>{previousWord}</span>
        <p>
          The correct translation for {previousWord} was {answer} and you chose{' '}
          {guess}
        </p>
        <button onClick={handleNextWord}>Try another word!</button>
        <p>Your total score is: {totalScore} </p>
        <p>You have answered this word correctly {newCorrect} times.</p>
        <p>You have answered this word incorrectly {newIncorrect} times.</p>
      </div>
    );
  }
}

export default FeedbackPage;
