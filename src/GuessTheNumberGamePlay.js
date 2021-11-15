import React from 'react';
import GuessTheNumberLogic from './components/helpers/GuessTheNumberGameLogic';

class GuessTheNumberGamePlay extends React.Component {
    render() 
    {
      return <div> <GuessTheNumberLogic></GuessTheNumberLogic></div>;
    }
  }


export default GuessTheNumberGamePlay;