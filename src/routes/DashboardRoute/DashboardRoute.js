import React, { Component } from 'react';
import languageApiService from '../../services/language-api-service';
import languageContext from '../../contexts/languageContext';
import { Link } from 'react-router-dom';

class DashboardRoute extends Component {
  static contextType = languageContext;

  componentDidMount() {
    this.context.clearError();
    languageApiService
      .getWords()
      .then((res) => {
        this.context.setLanguage(res.language);
        this.context.setWords(res.words);
      })
      .catch(this.context.setError);
  }

  renderWords() {
    const { words = [] } = this.context;
    if(words.length === 0) {
      return <p>Looks like there's nothing to practice</p>
    }
    return words.map(word => (
      <ul>
        <li key={word.id}>{word.original}</li>
      </ul>
    ))
  }

  render() {
    console.log(this.context.language, 'context test');
    const wordsListArray = this.context.words.map((word) => {
      return (
        <li key={word.id}>
          <h4>{word.original}</h4>
          {`Correct: ${word.correct_count}`}
          {`Incorrect: ${word.incorrect_count}`}
        </li>
      );
    });

    return (
      <div>
        <h2>Let's practice {this.context.language.name}!</h2>
        <h3>Words to practice</h3>
        <ul>{wordsListArray}</ul>
        <p>{`Total correct answers: ${this.context.language.totalScore}`}</p>

        <Link to='/learn'>
          <button>Start practice</button>
        </Link>
      </div>
    );
  }
}

export default DashboardRoute;
