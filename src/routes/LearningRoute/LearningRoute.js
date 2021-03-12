import React, { Component } from 'react';
import languageApiService from '../../services/language-api-service';
import learningContext from '../../contexts/learningContext';
import NextWordPage from './next-word';
import FeedbackPage from './feedback';

class LearningRoute extends Component {
  static contextType = learningContext;
  state = {
    userResponse: '',
    feedback: false,
    previousIncorrectCount: 0,
    previousCorrectCount: 0,
  };

  componentDidMount() {
    this.context.clearError();
    languageApiService
      .getNextWord()
      .then((res) => {
        this.context.setNextWord(res.nextWord);
        this.context.setTotalScore(res.totalScore);
        this.context.setWordCorrectCount(res.wordCorrectCount);
        this.context.setWordIncorrectCount(res.wordIncorrectCount);
      })
      .catch(this.context.setError);
  }
  handleChange = (e) => {
    e.preventDefault();
    let userInput = e.target.value;
    this.setState({ userResponse: userInput });
  };
  handleSubmitAnswer = (e) => {
    e.preventDefault();
    const guess = { guess: this.state.userResponse };
    languageApiService
      .getNextWord()
      .then((res) => {
        this.context.setPrevious(res.nextWord);
        this.setState({ previousCorrectCount: res.wordCorrectCount });
        this.setState({ previousIncorrectCount: res.wordIncorrectCount });
      })
      .catch(this.context.setError)
      .then(
        languageApiService.postGuess(guess).then(
          languageApiService
            .postGuess(guess)
            .then((res) => {
              this.context.clearError();
              this.setState({ feedback: true });
              this.context.setIsCorrect(res.isCorrect);
              this.context.setNextWord(res.nextWord);
              this.context.setTotalScore(res.totalScore);
              this.context.setWordCorrectCount(res.wordCorrectCount);
              this.context.setWordIncorrectCount(res.wordIncorrectCount);
              this.context.setAnswer(res.answer);
              this.context.setGuess(this.state.userResponse);
            })
            .catch(this.context.error)
        )
      );
  };

  handleNextWord = (e) => {
    e.preventDefault();
    this.setState({ feedback: false });
    this.setState({ userResponse: '' });
  };

  renderNextWord() {
    if (this.state.feedback === true) {
      return (
        <FeedbackPage
          guess={this.context.guess}
          answer={this.context.answer}
          totalScore={this.context.totalScore}
          previousCorrectCount={this.state.previousCorrectCount}
          previousIncorrectCount={this.state.previousIncorrectCount}
          isCorrect={this.context.isCorrect}
          previousWord={this.context.previousWord}
          handleNextWord={this.handleNextWord}
        />
      );
    } else {
      return (
        <NextWordPage
          previousWord={this.context.previousWord}
          nextWord={this.context.nextWord}
          totalScore={this.context.totalScore}
          userResponse={this.state.userResponse}
          wordCorrectCount={this.context.wordCorrectCount}
          wordIncorrectCount={this.context.wordIncorrectCount}
          handleSubmitAnswer={this.handleSubmitAnswer}
          handleChange={this.handleChange}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderNextWord()}</div>
      </div>
    );
  }
}

export default LearningRoute;
