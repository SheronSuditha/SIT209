import React from 'react';
import './home.css';
import { Table, Button } from 'react-bootstrap';
import Devices from './devices';
function Home() {
	return (
		<div className="content">
			<div className="wrap">
				<h1>Your Devices</h1>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Device</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<Devices id="ID" name="NAME" device="DEVICE" />
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default Home;
