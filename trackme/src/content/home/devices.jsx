import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Overlay, Popover } from "react-bootstrap";
import Location from "./location";
import { get_device_history } from "../../utils/auth";
function Devices({ id, name, device, sensorData }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [status, setstatus] = useState(false);
  const [locationData, setlocationData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setlocationData(sensorData);
    tester();
    return () => {
      //asd
    };
  }, [sensorData]);

  const tester = async () => {
    console.log(sensorData);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(locationData);
    setShow(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };

  return (
    <>
      <tr id={id}>
        <td>
          <h5>{id}</h5>
        </td>
        <td>
          <h5>{name}</h5>
        </td>
        <td>
          <h5>{device}</h5>
        </td>
        <td>
          <Button
            variant="warning"
            onClick={handleClick}
            style={{ fontFamily: "Fira Sans" }}
          >
            VIEW
          </Button>
        </td>
      </tr>
      {loading === true ? (
        <h1>Loading</h1>
      ) : (
        <Location
          show={show}
          onHide={() => setShow(false)}
          location={sensorData}
        />
      )}
    </>
  );
}

export default Devices;
