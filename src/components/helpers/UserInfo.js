import { Card } from "react-bootstrap";

function UserInfo(props) {
    const {userName, numberOfTrials, lastGuess, gameWin} = props
    return (
      <>
        <Card style={{ width: '18rem', color: 'black', fontSize: "medium"}}>
        <Card.Body>
            <Card.Title> UserName: {userName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Game Win: {gameWin}</Card.Subtitle>
            <Card.Text>
            Select low bound and upper bound from Configuration Panel
            <li>Number Of Trials in this game: {numberOfTrials}</li>
            <li>Your Last Guess in this Game: {lastGuess === null ? <h1>Not Entered Yet</h1> : lastGuess}</li>
            </Card.Text>
            <Card.Link href="#">Game Center</Card.Link>
        </Card.Body>
        </Card>
      </>
    );
  }
  
export default UserInfo;



