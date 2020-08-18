import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Overlay, Popover } from "react-bootstrap";
import Location from "./location";
import { get_device_history } from "../../utils/auth";
import { useDispatch } from "react-redux";

import { alert, remove_alert } from '../../redux/actions/alert_a'
import {add_location_Data} from '../../redux/actions/device_a';




function Devices({ id, name, device, sensorData }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [status, setstatus] = useState(false);
  const [locationData, setlocationData] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(alert({
      message: "Loading Location details"
    }))

    const resp = await get_device_history(id);
    

    console.log(locationData);
    setTimeout(() => {
      setloading(false);
      setShow(true);
      console.log(resp);
      dispatch(add_location_Data({
        location: resp
      }))
      dispatch(remove_alert())
    }, 2000);
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
      {
        loading !== true? (
        <Location
          show={show}
          onHide={() => setShow(false)}
          location={sensorData}
        />
        ) :
        ""
      }
      
    </>
  );
}

export default Devices;
