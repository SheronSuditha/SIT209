import React, { useEffect, useState } from 'react';
import { Button, Modal, Jumbotron, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
function Location(props) {
	const [ data, setdata ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const sensorData = props.sensordata;
	const device_data = useSelector((state) => state.device_data);

	return loading === false ? (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<h2>Movements</h2>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						fontFamily: 'Fira Sans',
						textAlign: 'center',
						flexWrap: 'wrap'
					}}
				>
					{device_data.map((d) => (
						<div
							style={{
								background: '#eeeeee',
								margin: '10px',
								textAlign: 'center',
								borderRadius: '20px',
								width: '400px',
								padding: '15px'
							}}
						>
							<p>
								<strong>Temp:</strong> {d.temp}
							</p>
							<p>
								<strong>Ts:</strong> {d.ts}
							</p>
							<p>
								<h3>Location:</h3> <br />
								<p>
									<strong>Lat:</strong> {d.loc.lat}
								</p>
								<p>
									<strong>Lon:</strong> {d.loc.lon}
								</p>
							</p>
						</div>
					))}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
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
					<h1>Hang on!</h1>
					<p>Getting my gear ready to display your devices!</p>
				</Container>
			</Jumbotron>
		</div>
	);
}

export default Location;
