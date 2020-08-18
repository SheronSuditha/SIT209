import React, { useEffect, useState } from "react";
import { Button, Modal, Jumbotron, Container } from "react-bootstrap";

function Location(props) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const sensorData = props.sensordata;
  return loading === false ? (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Location Details</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.forEach((element) => (
          <p>
            Location: <br /> Lat: {element.loc.lat}
          </p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
      }}
    >
      <Jumbotron style={{ alignItems: "center" }}>
        <Container>
          <h1>Hang on!</h1>
          <p>Getting my gear ready to display your devices!</p>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Location;
