import React, { Component } from 'react';
import languageApiService from '../../services/language-api-service';
import languageContext from '../../contexts/languageContext';
import { Link } from 'react-router-dom';
import WordsList from '../LearningRoute/words-list';

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
    if (words.length === 0) {
      return <p>Looks like there's nothing to practice</p>;
    }
    return words.map((word) => (
      <WordsList
        key={word.id}
        word={word.original}
        count={word.correct_count}
        incorrectCount={word.incorrect_count}
      />
    ));
  }

  render() {
    return (
      <section>
        <h2>{`Let's practice ${this.context.language.name}!`}</h2>
        <Link to='/learn'>
          <button>Start practicing</button>
        </Link>
        <div className='words-to-practice'>
          <h3>Words to practice</h3>
          <ul>{this.renderWords()}</ul>
          <p>{`Total correct answers: ${this.context.language.total_score}`}</p>
        </div>
        
      </section>
    );
  }
}

export default DashboardRoute;
