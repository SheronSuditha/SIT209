import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import { send_command_mqtt } from '../../utils/auth';

function SendCommand() {
	const user = useSelector((state) => state.user);

	const deviceName = useRef(null);
	const command = useRef(null);
	const [ loading, setloading ] = useState(false);
	const [ Notifier, setNotifier ] = useState({
		status: null,
		message: null,
		type: null
	});

	const handlePublish = async (e) => {
		e.preventDefault();
		setloading(true);

		if (deviceName === null || command === null) {
			setloading(false);
			return setNotifier({
				status: false,
				message: 'Invalid Details',
				type: 'danger'
			});
		}
		const device = deviceName.current.value;
		const cmd = command.current.value;

		const resp = await send_command_mqtt(device, cmd);
		if (resp) {
			setloading(false);
			setNotifier({
				status: false,
				message: 'Trasmitted!',
				type: 'success'
			});
		} else {
			setloading(false);
			setNotifier({
				status: false,
				message: 'Something happened!',
				type: 'danger'
			});
		}
	};
	return (
		<div className="root">
			{Notifier.status === false ? (
				<Alert key="1" variant={Notifier.type}>
					{Notifier.message}
				</Alert>
			) : (
				''
			)}
			<form>
				<h3>Send a Command</h3>

				<div className="form-group">
					<label>Username</label>
					<input type="text" className="form-control" placeholder={user.username} disabled />
				</div>

				<div className="form-group">
					<label>Device</label>
					<input type="text" className="form-control" placeholder="Device Name" />
				</div>

				<div className="form-group">
					<label>Command</label>
					<input type="text" className="form-control" placeholder="Command" />
				</div>

				{loading === false ? (
					<button
						type="submit"
						className="btn btn-primary btn-block"
						style={{ fontFamily: 'Fira Sans' }}
						onClick={handlePublish}
					>
						Publish Command
					</button>
				) : (
					<button type="submit" className="btn btn-primary btn-block" disabled>
						<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						&nbsp; Informing devices!
					</button>
				)}
			</form>
		</div>
	);
}

export default SendCommand;
