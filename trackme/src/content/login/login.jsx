import React, { useRef, useState, useEffect } from 'react';
import './login.css';
import { Alert, Spinner } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import { get_user_fromauth, check_user } from '../../utils/auth';

import { useDispatch } from 'react-redux';
import { set_username } from '../../redux/actions/user_a';

function Login() {
	const [ authState, setauthState ] = useState(false);
	const [ Notifier, setNotifier ] = useState({
		status: null,
		message: null
	});
	const [ loading, setloading ] = useState(false);
	const dispatch = useDispatch();

	const username = useRef('');
	const password = useRef('');
	const history = useHistory();
	useEffect(() => {
		checkusr();
		return () => {
			setloading(false);
		};
	}, []);

	const checkusr = async () => {
		const data = await check_user();
		if (data.state === true) {
			dispatch(
				set_username({
					username: localStorage.getItem('username')
				})
			);
			history.push('/');
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log('RUNNING THIS');
		setloading(true);
		const user = `${username.current.value}`;
		const pass = `${password.current.value}`;
		const resp = await get_user_fromauth(user, pass);
		let data = await resp.data;
		if (data.success === false) {
			setNotifier({
				status: false,
				message: 'No User Found'
			});
		} else {
			localStorage.setItem('username', user);
			localStorage.setItem('isAdmin', data.isAdmin);
			localStorage.setItem('isAuthenticated', true);
			dispatch(
				set_username({
					username: user
				})
			);
			setTimeout(() => {
				history.push('/');
			}, 5000);
		}
	};

	return (
		<div className="root" style={{ flexDirection: 'column' }}>
			{Notifier.status === false ? (
				<Alert key="1" variant="danger">
					{Notifier.message}
				</Alert>
			) : (
				''
			)}
			<form>
				<h3>Sign In</h3>

				<div className="form-group">
					<label>Username</label>
					<input type="text" className="form-control" placeholder="Enter username" ref={username} />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control" placeholder="Enter password" ref={password} />
				</div>

				<div className="form-group">
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id="customCheck1" />
						<label className="custom-control-label" htmlFor="customCheck1">
							Remember me
						</label>
					</div>
				</div>

				{loading === false ? (
					<button type="submit" className="btn btn-primary btn-block" onClick={handleLogin}>
						Sign In
					</button>
				) : (
					<button type="submit" className="btn btn-primary btn-block" onClick={handleLogin} disabled>
						<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						&nbsp; Packing up bags!
					</button>
				)}
				<p className="forgot-password text-right">
					No account ? create a new account <a href="/register">here</a>
				</p>
			</form>
		</div>
	);
}

export default Login;
