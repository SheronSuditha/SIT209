import React, { useRef, useState } from 'react';
import './register.css';
import { register_user } from '../../utils/auth';
import { Alert, Spinner } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

function Register() {
	const [ notifier, setnotifier ] = useState({
		status: null,
		message: null,
		type: null
	});
	const [ loading, setloading ] = useState(false);
	const username = useRef(null);
	const password = useRef(null);
	const confirmpass = useRef(null);
	const history = useHistory();

	const handleOnClick = async (e) => {
		setloading(true);
		e.preventDefault();
		const usr = username.current.value;
		const pass = password.current.value;
		const confpass = confirmpass.current.value;
		if (pass === confpass) {
			const resp = await register_user(usr, pass);
			if (resp.success === true) {
				setnotifier({
					status: false,
					message: 'Redirecting to login! in 3 seconds',
					type: 'success'
				});
				setTimeout(() => {
					setloading(false);
					history.push('/');
				}, 3000);
			}
		} else {
			setnotifier({
				status: false,
				message: 'Password do not match!',
				type: 'danger'
			});
			setloading(true);
		}
	};

	return (
		<div className="root" style={{ flexDirection: 'column' }}>
			{notifier.status === false ? (
				<Alert key={4} variant={notifier.type}>
					{notifier.message}
				</Alert>
			) : (
				''
			)}
			<form>
				<h3>Sign Up</h3>
				<div className="form-group">
					<label>Username</label>
					<input type="text" className="form-control" placeholder="Username" ref={username} />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control" placeholder="Password" ref={password} />
				</div>

				<div className="form-group">
					<label>Confirm Password</label>
					<input type="password" className="form-control" placeholder="Confirm Password" ref={confirmpass} />
				</div>
				{loading === false ? (
					<button type="submit" className="btn btn-primary btn-block" onClick={handleOnClick}>
						Sign Up
					</button>
				) : (
					<button type="submit" className="btn btn-primary btn-block" onClick={handleOnClick} disabled>
						<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						&nbsp; Packing up bags!
					</button>
				)}
				<p className="forgot-password text-right">
					Already registered ? <a href="/login">sign in</a>
				</p>
			</form>
		</div>
	);
}

export default Register;
