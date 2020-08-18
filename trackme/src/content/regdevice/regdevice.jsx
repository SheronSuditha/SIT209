import React, { useRef, useState } from 'react';
import { register_device } from '../../utils/auth';
import { Alert, Spinner } from 'react-bootstrap';

function RegDevice() {
	const username = useRef(null);
	const device_name = useRef(null);
	const [ loading, setloading ] = useState(false);
	const [ Notifier, setNotifier ] = useState({
		status: null,
		message: null,
		type: null
	});

	const handleRegisterDevice = async (e) => {
		e.preventDefault();
		setloading(true);

		const usr = username.current.value;
		const devicename = device_name.current.value;
		const resp = await register_device(devicename, usr);
		if (!resp.error && resp.response === 'Device Successfully added!') {
			setloading(false);
			setNotifier({
				status: false,
				message: 'Device Successfully added!',
				type: 'success'
			});
		} else {
			setloading(false);
			setNotifier({
				status: false,
				message: 'Something Happened!',
				type: 'danger'
			});
		}
	};

	return (
		<div className="root" style={{ flexDirection: 'column' }}>
			{Notifier.status === false ? (
				<Alert key="1" variant={Notifier.type}>
					{Notifier.message}
				</Alert>
			) : (
				''
			)}
			<form>
				<h3>Device Registeration</h3>

				<div className="form-group">
					<label>Username</label>
					<input type="text" className="form-control" placeholder="Enter username" ref={username} />
				</div>

				<div className="form-group">
					<label>Device Name</label>
					<input type="text" className="form-control" placeholder="Enter Device Name" ref={device_name} />
				</div>

				{loading === false ? (
					<button type="submit" className="btn btn-primary btn-block" onClick={handleRegisterDevice}>
						Register My Device
					</button>
				) : (
					<button type="submit" className="btn btn-primary btn-block" disabled>
						<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						&nbsp; Sending into cyberspace!
					</button>
				)}
			</form>
		</div>
	);
}

export default RegDevice;
