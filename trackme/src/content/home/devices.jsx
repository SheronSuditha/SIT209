import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Overlay, Popover } from 'react-bootstrap';
import Location from './location';
import { get_device_history } from '../../utils/auth';
function Devices({ id, name, device, sensorData }) {
	const [ show, setShow ] = useState(false);
	const [ target, setTarget ] = useState(null);
	const ref = useRef(null);
	const [ status, setstatus ] = useState(false);
	const [ locationData, setlocationData ] = useState([]);

	useEffect(() => {
		tester();
		return () => {
			//asd
		};
	}, []);

	const tester = async () => {
		const resp = await get_device_history(id);
		setlocationData(resp);
		setTimeout(() => {
			console.log(locationData);
			console.log(resp);
		}, 2000);
	};
	const handleClick = async (e) => {
		e.preventDefault();
		setShow(!show);
		setTarget(e.target);
		const resp = await get_device_history(id);
		setlocationData(resp);
		setTimeout(() => {
			console.log(locationData);
			console.log(resp);
		}, 2000);
	};

	return (
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
				<Button variant="warning" onClick={handleClick} style={{ fontFamily: 'Fira Sans' }}>
					VIEW
				</Button>
			</td>
		</tr>
	);
}

export default Devices;
