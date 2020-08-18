import React, { useState, useEffect } from 'react';
import './home.css';
import { Table, Button, Alert, Jumbotron, Container, Spinner } from 'react-bootstrap';
import { get_user_devices } from '../../utils/auth';
import Devices from './devices';
import { useSelector } from 'react-redux';
function Home() {
	const [ devices, setdevices ] = useState([]);
	const [ loading, setloading ] = useState(false);
	useEffect(() => {
		setloading(true);
		getDevices();
		return () => {};
	}, []);

	const alerts = useSelector((state) => state.alerts);

	const getDevices = async () => {
		const resp = await get_user_devices();
		console.log(resp);
		const data = await resp.data;
		setdevices(data);
		setloading(false);
	};

	return loading === false ? (
		<div>
			<div className="content" style={{ flexDirection: 'column' }}>
				<div>
					{alerts.status === true ? (
						<Alert key={2} variant="success">
							<h5>{alerts.message}</h5>
						</Alert>
					) : (
						''
					)}
				</div>
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
		</div>
	) : (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '95vh'
			}}
		>
			<Jumbotron style={{ alignItems: 'center' }}>
				<Container>
					<h1>Getting ready!</h1>
					<div>
						<h6>
							Unbuckling seatbealts &nbsp; <Spinner animation="border" variant="success" />
						</h6>
					</div>
				</Container>
			</Jumbotron>
		</div>
	);
}

export default Home;
