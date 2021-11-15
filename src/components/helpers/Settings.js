import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

function Settings() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Settings
        </Button>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Game Settings</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <li>Vistar Media</li>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
  
export default Settings;