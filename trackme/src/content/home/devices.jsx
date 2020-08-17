import React from 'react';
import { Button } from 'react-bootstrap';

function Devices({ id, name, device }) {
	const handleView = async () => {
		//do smth
	};
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{device}</td>
			<td>
				<Button variant="warning" onClick={handleView}>
					VIEW
				</Button>
			</td>
		</tr>
	);
}

export default Devices;
