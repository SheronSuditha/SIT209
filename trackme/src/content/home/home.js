import React, { useState, useEffect } from 'react';
import './home.css';
import { Table, Button } from 'react-bootstrap';
import { get_user_devices } from '../../utils/auth';
import Devices from './devices';
function Home() {
	const [ devices, setdevices ] = useState([]);
	useEffect(() => {
		getDevices();
		return () => {};
	}, []);

	const getDevices = async () => {
		const resp = await get_user_devices();
		console.log(resp);
		const data = await resp.data;
		setdevices(data);
	};

	return (
		<div className="content">
			<div className="wrap">
				<h1>Your Devices</h1>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>
								<h5>#</h5>
							</th>
							<th>
								<h5>Username</h5>
							</th>
							<th>
								<h5>Device</h5>
							</th>
							<th>
								<h5>Actions</h5>
							</th>
						</tr>
					</thead>
					<tbody>
						{devices.map((element) => (
							<Devices
								id={element._id}
								name={element.user}
								device={element.name}
								sensorData={element.sensorData}
							/>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default Home;
