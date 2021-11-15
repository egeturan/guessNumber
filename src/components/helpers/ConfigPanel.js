import React, { useEffect }  from 'react';
import { Container } from "react-bootstrap";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { selectLowerBound, selectUpperBound,setUpperBound, selectUserName,
  setLowerBound, 
  reset, setTargetNumber, selectTargetNumber, resetGame, setUserName, selectGamePlay, setGamePlay, resetGameAllSettings } from '../../StateManager/slices/counterSlice';
    
function newGuessValue(lowerBound, upperBound){
  let randomNumber = lowerBound + (Math.random() * (upperBound - lowerBound))
  return parseInt(randomNumber)
}

function valid(lowerBound, upperBound)
{
  //console.log(lowerBound + " " + upperBound)
  if(lowerBound < upperBound)
  {
    if(Math.abs(upperBound - lowerBound) === 1)
      return false;
    return true;
  }
  else{
    return false;
  }
}

function ConfigPanel(props) {
        const lowerBound = useSelector(selectLowerBound);
        const upperBound = useSelector(selectUpperBound);
        const userName = useSelector(selectUserName);
        const targetNumber = useSelector(selectTargetNumber);
        const gamePlay = useSelector(selectGamePlay)
        const dispatch = useDispatch();

        useEffect(() => {
          let guessTarget = null;

          async function createNewGuessNumber(){
            if(valid(lowerBound, upperBound))
            {
              guessTarget = await newGuessValue(lowerBound, upperBound);
              dispatch(setTargetNumber(guessTarget))
            }
          }

          async function boundValidation(dispatch, lowerBound, upperBound){
            //check
            if (valid(lowerBound, upperBound))
            {
              await dispatch(setGamePlay(true))
              return <h1>Valid</h1>
            }
            else
            {
              await dispatch(setGamePlay(false))
              return <h1>Invalid</h1>
            }
              
          }

          // Update the document title using the browser API
          document.title = `Last Guess is: ` + guessTarget;
          createNewGuessNumber();
          boundValidation(dispatch, lowerBound, upperBound)
          console.log("New Number Created")
        }, [lowerBound, upperBound, dispatch]);


let lowerBoundForm = <Form.Group as={Row} className="mb-3" controlId="lowerBoundID">
            <Form.Label column sm="6">
            Lower Bound
            </Form.Label>
            <Col sm="20">
            <Form.Control   type="text" 
                            name="lowerBoundState" 
                            onChange={e => {
                              if(e.target.value.length === 0)
                              {
                                dispatch(setLowerBound(' '))
                              }
                              else if(!isNaN(e.target.value))
                              {
                                dispatch(setLowerBound(Number(e.target.value)))
                              }
                              else if(e.target.value == " -" || e.target.value == "-")
                              {
                                dispatch(setLowerBound('-'))
                              }
                            }}
                            value={lowerBound} />
            </Col>
            </Form.Group>;
            

let upperBoundForm = <Form.Group as={Row} className="mb-3" controlId="upperBoundID">
            <Form.Label column sm="6">
            Upper Bound
            </Form.Label>
            <Col sm="20">
            <Form.Control   type="text" 
                            name="upperBoundState" 
                            onChange={e => {
                              console.log(e.target.value.length)
                              if(e.target.value.length === 0)
                              {
                                dispatch(setUpperBound(' '))
                              }
                              else if(!isNaN(e.target.value))
                              {
                                dispatch(setUpperBound(Number(e.target.value)))
                              }
                              else if(e.target.value == " -" || e.target.value == "-")
                              {
                                dispatch(setUpperBound('-'))
                              }
                            }}
                            value={upperBound}/>
            </Col>
            </Form.Group>;



let enterUserName = <Form.Group as={Row} className="mb-3" controlId="upperBoundID">
            <Form.Label column sm="6">
            UserName
            </Form.Label>
            <Col sm="20">
            <Form.Control   type="text" 
                            name="userNameState" 
                            onChange={e => {
                                dispatch(setUserName(e.target.value))
                            }}
                            value={userName}/>
            </Col>
            </Form.Group>;
    
return <Container>
    {lowerBoundForm}
    {upperBoundForm}
    {enterUserName}
    <Button variant="outline-danger" onClick={() => {
                                          dispatch(reset())
                                          }}>Reset Lower and Upper Bound</Button>

<Button variant="outline-danger" onClick={() => {
            dispatch(resetGameAllSettings());
    }}>Reset All User Settings</Button>
                {/* For Target Number */}
                {/*targetNumber*/}
    </Container>;
}


export default ConfigPanel;





