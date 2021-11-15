import React from 'react';
import { Button } from "react-bootstrap";
import { selectTargetNumber, 
    selectNumberOfTrials, selectUserName, selectGameWin } from '../../StateManager/slices/counterSlice';  
import { useSelector } from 'react-redux';
    

function SendMessage(props) {
    const targetNumber = useSelector(selectTargetNumber);
    const numberOfTrials = useSelector(selectNumberOfTrials);
    const userName = useSelector(selectUserName);      
    const gameWin = useSelector(selectGameWin);

    function sendMessage(){
        const {websocket} = props // websocket instance passed as props to the child component. 
        var myList = [];
        websocket.onmessage = (e) => {
            console.log(e)
            const message = JSON.parse(e.data);
          }

        myList.push({"userName": userName})
        myList.push({"targetNumber": targetNumber.toString()})
        myList.push({"gameWin": gameWin.toString()})
        myList.push({"numberOfTrials": numberOfTrials.toString()})
        var myJsonString = JSON.stringify(myList);
        try {
            websocket.send(myJsonString) //send data to the server
            console.log("Data Sent")
        } catch (error) {
            console.log(error) // catch error
        }
    }

    return (
        <div>
            <Button variant="success" onClick={sendMessage}> WebSocket: Save Game Data with UserName</Button>
        </div>
    );
}

export default SendMessage;