import React, { useState, useEffect }  from 'react';
import { Container } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import UserInfo from './UserInfo'
import MainWebSocket from '../websocket/MainWebSocket';
import { selectLowerBound, selectUpperBound, selectTargetNumber, selectCurrentGuess, selectLastGuess, 
  selectNumberOfTrials, selectUserName, setNumberOfTrials, setCurrentGuess, setLastGuess, selectGameWin, setGameWin, resetGame } from '../../StateManager/slices/counterSlice';
    
  
function GuessTheNumberLogic() {
        const lowerBound = useSelector(selectLowerBound);
        const upperBound = useSelector(selectUpperBound);
        const lastGuess = useSelector(selectLastGuess);
        const targetNumber = useSelector(selectTargetNumber);
        const currentGuess = useSelector(selectCurrentGuess);
        const numberOfTrials = useSelector(selectNumberOfTrials);
        const userName = useSelector(selectUserName);      
        const gameWin = useSelector(selectGameWin);
        const dispatch = useDispatch();
        const [valState, setValState] = useState(0);

        useEffect(() => {
          //console.log("Last Guess:" + lastGuess)
          if(lastGuess === ""){
          // Update the document title using the browser API
          document.title = `New Guess Number`;
          setSituationView(<h1>No Decision Made Yet</h1>)
          }
        }, [lastGuess]);

        const [situationView, setSituationView] = useState(<h1>No Decision Made Yet</h1>)

        function checkGuess(){
            if(targetNumber === Number(currentGuess))
            {
              //add emoji
              setSituationView(<div><h1>You Found It <br/> 
                                  Number was {targetNumber}
                                  </h1>
                                  <Button type="text" onClick={() => {
                                    dispatch(resetGame())
                                    setSituationView(<h1>No Decision Made Yet</h1>)
                                  }}>
                                  New Round
                                  </Button>
                                  </div>
                                  
                                  
                                  )
              dispatch(setGameWin(gameWin + 1))
            }
            else if(targetNumber < currentGuess)
            {
                setSituationView(<h1>Decrease your Guess :)</h1>)
            }
            else
            {
                setSituationView(<h1>Increase your Guess :)</h1>)
            }
            dispatch(setNumberOfTrials(numberOfTrials + 1))
        }

        
    
return <Container>
    <Row>
    <Col>
    <h1>Guess the number between {lowerBound} and {upperBound}</h1>
    <input
          name="currentGuessState"
          value={valState}
          placeholder='Enter Your Guess'
          onChange={e => {
            dispatch(setCurrentGuess(e.target.value));
            setValState(e.target.value)
          }}
        />
        <Button variant="success" type="text" onClick={() => {
          dispatch(setLastGuess(currentGuess))
          checkGuess()
          setValState(0)
        }}>
        Make Guess
        </Button>
    </Col>
    <Col>
        {/*save state will be added */}
        <UserInfo userName={userName} numberOfTrials={numberOfTrials} lastGuess={lastGuess} gameWin={gameWin}></UserInfo>
        </Col>
        </Row>
        {situationView}
        <MainWebSocket></MainWebSocket>
    </Container>;
}


export default GuessTheNumberLogic;
