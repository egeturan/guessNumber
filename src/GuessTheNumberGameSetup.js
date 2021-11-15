import React from 'react';
import { useSelector } from 'react-redux';
import Settings from './components/helpers/Settings';
import GuessTheNumberGamePlay from './GuessTheNumberGamePlay';
import GuessTheNumberConfig from './GuessTheNumConfig';
import { selectGamePlay } from './StateManager/slices/counterSlice';

function GuessTheNumberGameSetup(){

      const gamePlay = useSelector(selectGamePlay);

      const validConfiguration = <div>        
      <GuessTheNumberGamePlay></GuessTheNumberGamePlay>
      <GuessTheNumberConfig></GuessTheNumberConfig>
      <Settings></Settings>
      </div>

      const inValidConfiguration = <div>        
      <h1>Please arrange the lower bound and upper bound accordingly</h1>
      <GuessTheNumberConfig></GuessTheNumberConfig>
      <Settings></Settings>
      </div>;

      let MainView = null;

      if(gamePlay === true)
      {
        MainView = validConfiguration;
      }else if(gamePlay === false){
        MainView = inValidConfiguration;
      }

      return <div>
        {MainView}
      </div>;
    
  }


export default GuessTheNumberGameSetup;